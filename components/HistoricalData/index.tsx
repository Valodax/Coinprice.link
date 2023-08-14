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
    const [inputValue, setInputValue] = useState<number | "">("");
    const [historicalData, setHistoricalData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const stopLoop = useRef(false);
    const [showStopButton, setShowStopButton] = useState(false);
    const [currentRoundInfo, setCurrentRoundInfo] = useState({
        phaseId: BigInt("1"),
        aggregatorRoundId: BigInt("1"),
        startedAt: "",
        updatedAt: "",
    });

    async function getPhaseRoundDataBeginning(priceFeed: any, _phaseId: bigint) {
        let round = BigInt("1");
        let roundsData = [];

        while (true) {
            if (stopLoop.current) {
                break;
            }
            let roundId = (_phaseId << BigInt(64)) | round;
            try {
                console.log("round", round.toString());
                console.log("phaseId:", _phaseId.toString());
                console.log("roundId:", roundId.toString());
                const data = await priceFeed.call("getRoundData", [String(roundId)]);
                const roundUpdate = toDate(data.updatedAt);
                const roundData = { timestamp: roundUpdate, price: ethers.utils.formatUnits(data.answer, 8) };
                roundsData.push(roundData); // Store the fetched round data
                round++;
                console.log(roundData);
            } catch (error) {
                console.error(`Failed to fetch data for round ${round}: `, error);
                break; // Stop the loop if we fail to fetch data for a round
            }
        }
        // Return the last round id and the fetched rounds data
        return { lastRoundId: round - BigInt("1"), roundsData };
    }

    async function loopAllData(priceFeedContract: any) {
        let historicalData: any = [];
        let currentPhaseId = currentRoundInfo.phaseId;
        let currentAggregatorRoundId = currentRoundInfo.aggregatorRoundId;

        // From beginning
        for (let _phaseId = BigInt("1"); _phaseId <= currentPhaseId; _phaseId++) {
            if (stopLoop.current) {
                break;
            }
            console.log("current phase id", Number(_phaseId));

            // Get the last round of this phase
            let { lastRoundId, roundsData } =
                _phaseId === currentPhaseId
                    ? { lastRoundId: currentAggregatorRoundId, roundsData: [] }
                    : await getPhaseRoundDataBeginning(priceFeedContract, _phaseId);

            console.log("this aggregator's final round id", Number(lastRoundId));

            // Append the fetched rounds data to historicalData
            historicalData = [...historicalData, ...roundsData]; // Add the fetched rounds data to historicalData
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

    const token = CryptoCurrencyFeeds.aave;

    async function fetchHistoricalData() {
        stopLoop.current = false;
        setShowStopButton(true);
        const sdk = new ThirdwebSDK("ethereum");
        const contract = await sdk.getContract(token.address, aggregatorV3InterfaceABI);
        const data = await loopAllData(contract);
        setHistoricalData(data);
    }

    const {
        contract: priceFeed,
        isLoading: isContractLoading,
        error: contractError,
    } = useContract(token.address, aggregatorV3InterfaceABI);

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
            setCurrentRoundInfo({
                phaseId: phaseId,
                aggregatorRoundId: aggregatorRoundId,
                startedAt: startedAt.toString(),
                updatedAt: updatedAt.toString(),
            });
        }
    }, [data, isContractLoading, isContractReadLoading, contractError, contractReadError]);

    return (
        <div className="p-10">
            <div className="flex flex-col gap-10 items-center justify-center">
                <div>Current Phase Id: {currentRoundInfo.phaseId.toString()}</div>
                <div>Current Aggregator Round Id: {currentRoundInfo.aggregatorRoundId.toString()}</div>
                <div>Round Started At: {currentRoundInfo.startedAt}</div>
                <div>Most Recent Price Update At: {currentRoundInfo.updatedAt}</div>
                <div>
                    {token.name.toUpperCase()} / USD Price: {price}
                </div>
                <div className="flex flex-col gap-3">
                    {!showStopButton ? (
                        <div className="flex gap-5">
                            <button
                                className="font-medium hover:text-blue-400 transition-colors ease-in-out duration-500"
                                onClick={fetchHistoricalData}
                            >
                                Get Price Data From Beginning
                            </button>
                        </div>
                    ) : (
                        ""
                    )}
                    {showStopButton ? (
                        <div className="flex justify-center">
                            <button
                                className="font-medium hover:text-blue-400 transition-colors ease-in-out duration-500"
                                onClick={() => {
                                    stopLoop.current = true;
                                    setShowStopButton(false);
                                }}
                            >
                                Stop Fetching
                            </button>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
                <div className="flex gap-5">
                    Get Price Data Starting from phase:
                    <form onSubmit={handleSubmit}>
                        <input
                            className="text-black w-15"
                            type="number"
                            min={1}
                            max={Number(currentRoundInfo.phaseId)}
                            value={inputValue}
                            onChange={handleChange}
                        />
                        <button
                            className="font-medium hover:text-blue-400 transition-colors ease-in-out duration-500 pl-5"
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
