"use client";
import { CryptoCurrencyFeeds } from "@/utils/ContractRepository/Ethereum/Contracts";
import { ThirdwebSDK, useContract, useContractRead } from "@thirdweb-dev/react";
import { aggregatorV3InterfaceABI } from "@/utils/ContractAbis/AggregatorV3Abi";
import { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import { toDate } from "@/utils/HelperFunctions/toDate";

async function getPhaseStartAndEndDates(phaseId: bigint, priceFeed: any) {
    // Get the first round of this phase
    let firstRoundId = (phaseId << BigInt(64)) | BigInt("1");
    let firstRoundData = await priceFeed.call("getRoundData", [String(firstRoundId)]);
    let startDate = toDate(firstRoundData.startedAt);
    console.log("startDate", startDate);

    // Get the last round of this phase
    let lastRoundId = (phaseId << BigInt(64)) | BigInt("0xFFFFFFFFFFFFFFFF");
    let lastRoundData;
    let endDate;
    try {
        lastRoundData = await priceFeed.call("getRoundData", [String(lastRoundId)]);
        endDate = toDate(lastRoundData.updatedAt);
        console.log("endDate", endDate);
    } catch (error) {
        console.error(`Failed to fetch data for round ${lastRoundId}: `, error);
    }
    return { startDate, endDate };
}

export default function HistoricalData() {
    const [price, setPrice] = useState("");
    const [phaseId, setPhaseId] = useState(BigInt("1"));
    const [aggregatorRoundId, setAggregatorRoundId] = useState(BigInt("1"));
    const [inputValue, setInputValue] = useState<number | "">("");
    const [historicalData, setHistoricalData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const stopLoop = useRef(true);

    async function getPhaseRoundDataBeginning(phaseId: bigint, priceFeed: any) {
        let round = BigInt("1");
        let roundsData = [];

        while (true) {
            if (stopLoop.current) {
                break;
            }
            let roundId = (phaseId << BigInt(64)) | round;
            try {
                console.log("phaseId:", Number(phaseId));
                const data = await priceFeed.call("getRoundData", [String(roundId)]);
                const roundUpdate = toDate(data.updatedAt);
                const roundData = { timestamp: roundUpdate, price: ethers.utils.formatUnits(data.answer, 8) };
                console.log(roundData);

                roundsData.push(roundData); // Store the fetched round data

                round++;
            } catch (error) {
                console.error(`Failed to fetch data for round ${round}: `, error);
                break; // Stop the loop if we fail to fetch data for a round
            }
        }

        return { lastRoundId: round - BigInt("1"), roundsData }; // Return the last round id and the fetched rounds data
    }

    async function getPhaseRoundDataEnding(phaseId: bigint, priceFeed: any, lastRoundId: bigint) {
        let roundsData = [];

        for (let round = lastRoundId; round >= BigInt("1"); round--) {
            if (stopLoop.current) {
                break;
            }
            let roundId = (phaseId << BigInt(64)) | round;
            try {
                console.log("phaseId:", Number(phaseId));
                const data = await priceFeed.call("getRoundData", [String(roundId)]);
                const roundUpdate = toDate(data.updatedAt);
                const roundData = { timestamp: roundUpdate, price: ethers.utils.formatUnits(data.answer, 8) };
                console.log(roundData);

                roundsData.unshift(roundData); // Store the fetched round data at the beginning of the array
            } catch (error) {
                console.error(`Failed to fetch data for round ${round}: `, error);
                break; // Stop the loop if we fail to fetch data for a round
            }
        }

        return { lastRoundId: BigInt("1"), roundsData }; // Return the last round id and the fetched rounds data
    }

    async function loopAllData(
        currentPhaseId: bigint,
        currentAggregatorRoundId: bigint,
        priceFeed: any,
        fromEnding: boolean = false
    ) {
        let historicalData: any = [];

        if (!fromEnding) {
            for (let phaseId = BigInt("1"); phaseId <= currentPhaseId; phaseId++) {
                if (stopLoop.current) {
                    break;
                }
                console.log("current phase id", Number(phaseId));
                let { lastRoundId, roundsData } =
                    phaseId === currentPhaseId
                        ? { lastRoundId: currentAggregatorRoundId, roundsData: [] }
                        : await getPhaseRoundDataBeginning(phaseId, priceFeed);

                console.log("current aggregator round id", Number(lastRoundId));

                historicalData = [...historicalData, ...roundsData]; // Add the fetched rounds data to historicalData
            }
        } else {
            for (let phaseId = currentPhaseId; phaseId >= BigInt("1"); phaseId--) {
                if (stopLoop.current) {
                    break;
                }
                console.log("current phase id", Number(phaseId));

                let lastRoundId = phaseId === currentPhaseId ? currentAggregatorRoundId : BigInt("0xFFFFFFFFFFFFFFFF");
                let roundsData = await getPhaseRoundDataEnding(phaseId, priceFeed, lastRoundId);

                console.log("current aggregator round id", Number(lastRoundId));

                historicalData = [...roundsData.roundsData, ...historicalData]; // Prepend the fetched rounds data to historicalData
            }
        }

        return historicalData;
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value === "" ? "" : Number(event.target.value));
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const result = await getPhaseStartAndEndDates(BigInt(inputValue), priceFeed);
        console.log(result);
        alert(`Submitted number is: ${inputValue}`);
    }

    async function fetchHistoricalData(loopFromEnding: boolean) {
        stopLoop.current = false;
        const sdk = new ThirdwebSDK("ethereum");
        const contract = await sdk.getContract(CryptoCurrencyFeeds.eth.address, aggregatorV3InterfaceABI);
        const data = await loopAllData(phaseId, aggregatorRoundId, contract, loopFromEnding);
        setHistoricalData(data);
    }

    const {
        contract: priceFeed,
        isLoading: isContractLoading,
        error: contractError,
    } = useContract(CryptoCurrencyFeeds.eth.address, aggregatorV3InterfaceABI);

    const {
        data,
        isLoading: isContractReadLoading,
        error: contractReadError,
    } = useContractRead(priceFeed, "latestRoundData");

    useEffect(() => {
        if (data) {
            let price = ethers.utils.formatUnits(data.answer, 8);
            setPrice(price);
            console.log(data);
            const updatedTimestamp = data.updatedAt;
            const startedTimestamp = data.startedAt;
            const updatedAt = new Date(updatedTimestamp * 1000);
            const startedAt = new Date(startedTimestamp * 1000);
            console.log("Round started:", startedAt);
            console.log("Price last updated:", updatedAt);
            const phaseId = BigInt(data.roundId) >> BigInt(64);
            const aggregatorRoundId = BigInt(data.roundId) & BigInt("0xFFFFFFFFFFFFFFFF");
            setPhaseId(phaseId);
            setAggregatorRoundId(aggregatorRoundId);
        }
    }, [data, isContractLoading, isContractReadLoading, contractError, contractReadError]);

    return (
        <div className="p-10">
            <div className="flex flex-col gap-10 items-center justify-center">
                <div>Ethereum / USD Price: {price}</div>
                <div>Current Phase Id: {Number(phaseId)}</div>
                <div>Current Aggregator Round Id: {Number(aggregatorRoundId)}</div>
                <div className="flex flex-col gap-3">
                    <div className="flex gap-5">
                        <button
                            className="font-medium hover:text-blue-400 transition-colors ease-in-out duration-500"
                            onClick={() => {
                                fetchHistoricalData(false);
                            }}
                        >
                            Get Price Data From Beginning
                        </button>
                        <button
                            className="font-medium hover:text-blue-400 transition-colors ease-in-out duration-500"
                            onClick={() => {
                                fetchHistoricalData(true);
                            }}
                        >
                            Get Price Data From Ending
                        </button>
                    </div>
                    {stopLoop.current === false ? (
                        <div className="flex justify-center">
                            <button
                                className="font-medium hover:text-blue-400 transition-colors ease-in-out duration-500"
                                onClick={() => (stopLoop.current = true)}
                            >
                                Stop Fetching
                            </button>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
                <div className="flex">
                    <form onSubmit={handleSubmit}>
                        <input
                            className="text-black w-20"
                            type="number"
                            min={1}
                            max={Number(phaseId)}
                            value={inputValue}
                            onChange={handleChange}
                        />{" "}
                        <button
                            className="font-medium hover:text-blue-400 transition-colors ease-in-out duration-500 pl-10"
                            type="submit"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
