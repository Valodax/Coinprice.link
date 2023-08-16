import Moralis from "moralis";
const FeedConfirmedAbi = {
    anonymous: false,
    inputs: [
        { indexed: true, internalType: "address", name: "asset", type: "address" },
        { indexed: true, internalType: "address", name: "denomination", type: "address" },
        { indexed: true, internalType: "address", name: "latestAggregator", type: "address" },
        { indexed: false, internalType: "address", name: "previousAggregator", type: "address" },
        { indexed: false, internalType: "uint16", name: "nextPhaseId", type: "uint16" },
        { indexed: false, internalType: "address", name: "sender", type: "address" },
    ],
    name: "FeedConfirmed",
    type: "event",
};

try {
    await Moralis.start({
        apiKey: process.env.MORALIS_API_KEY,
    });

    const response = await Moralis.EvmApi.events.getContractEvents({
        chain: "0x1",
        topic: "0x27a180c70f2642f63d1694eb252b7df52e7ab2565e3f67adf7748acb7d82b9bc",
        address: "0x47Fb2585D2C56Fe188D0E6ec628a38b74fCeeeDf",
        abi: FeedConfirmedAbi,
    });

    console.log(response.raw);
} catch (e) {
    console.error(e);
}
