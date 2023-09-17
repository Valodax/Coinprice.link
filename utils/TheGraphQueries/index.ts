const timeFilter = Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60;
console.log("timeFilter", timeFilter);

export const recentlyUpdated = `
{
	dataFeeds(where: {live: true}, first: 300) {
		name
		id
		decimals
		prices(where: {blockTimestamp_gte: ${timeFilter.toString()}}) {
			price
			roundId
			blockTimestamp
		}
	}
}
`;

export const usdOnly = `
{
  dataFeeds(
    where: {live: true, denomination: "USD"}
    first: 300
    orderBy: name
    orderDirection: asc
  ) {
    name
    id
    decimals
    asset
    assetAddress
    denomination
    denominationAddress
    prices(first: 1) {
      price
      roundId
      blockTimestamp
    }
  }
}
`;

export const usdOnlyWithHistorical = `
{
  dataFeeds(
    where: {live: true, denomination: "USD"}
    first: 300
    orderBy: name
    orderDirection: asc
  ) {
    name
    id
    decimals
    asset
    assetAddress
    denomination
    denominationAddress
    prices(where: {blockTimestamp_gte: ${timeFilter.toString()}}, first: 500, orderBy: blockTimestamp, orderDirection: asc) {
      price
      roundId
      blockTimestamp
    }
  }
}
`;

export const latestPrice = `
{
  dataFeeds(
    where: {live: true}
    first: 300
    orderBy: name
    orderDirection: asc
  ) {
    name
    id
    decimals
    prices(first: 1) {
      price
      roundId
      blockTimestamp
    }
  }
}
`;

export const assetSpecificWithHistorical = `
{
  dataFeeds(where: {asset: "{asset}", denomination: "USD"}) {
    id
    phaseId
    live
    decimals
    prices(
      orderBy: roundId
      orderDirection: asc
      where: {blockTimestamp_gte: "{timeFilter}"}
    ) {
      id
      price
      roundId
      blockTimestamp
      blockNumber
    }
  }
}
`;
