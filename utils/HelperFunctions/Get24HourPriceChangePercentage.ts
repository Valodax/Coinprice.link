import { toDate } from "@/utils/HelperFunctions/toDate";
import { ethers } from "ethers";

export async function Get24HourPriceChangePercentage(priceFeed: any, phaseId: bigint, aggregatorRoundId: bigint) {
  let roundId = (phaseId << BigInt(64)) | aggregatorRoundId;
  const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000;
  let oldestRoundData; // Variable to store the oldest round data in the 24 hour window
  let latestRoundData = await priceFeed.call("getRoundData", [String(roundId)]); // Fetch the latest round data

  // Decrement roundId and fetch round data until you find data that is just over 24 hours old
  while (true) {
    console.log("roundId", roundId);
    roundId--;
    let data = await priceFeed.call("getRoundData", [String(roundId)]);
    let roundUpdate = toDate(data.updatedAt);
    if (roundUpdate.getTime() <= twentyFourHoursAgo) {
      oldestRoundData = data; // Update oldestRoundData when we find data that's over 24 hours old
      break;
    }
  }

  if (!oldestRoundData) {
    console.error("Failed to fetch round data from 24 hours ago.");
    return null;
  }

  // Calculate 24 hour price change
  let price24HoursAgo = parseFloat(ethers.utils.formatUnits(oldestRoundData.answer, 8));
  let latestPrice = parseFloat(ethers.utils.formatUnits(latestRoundData.answer, 8));
  let priceChange = ((latestPrice - price24HoursAgo) / price24HoursAgo) * 100;
  return priceChange;
}
