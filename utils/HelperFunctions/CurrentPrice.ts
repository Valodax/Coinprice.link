import { ethers } from "ethers";

export const currentPrice = (priceFeed: any) => {
  let price = ethers.BigNumber.from(priceFeed.prices[0].price);
  let result = ethers.utils.formatUnits(price, priceFeed.decimals);
  return result;
};
