import { NextResponse } from "next/server";
import { GetAssetSpecificDocument, GetAssetSpecificQuery, execute } from "@/.graphclient";

const url = `https://gateway.thegraph.com/api/${process.env.THE_GRAPH_API_KEY}/subgraphs/id/Fi4Vo18y9yZLVdCttcSie1yeKrUaTTQb5Ndz64ZnYvU9`;

interface ApolloResult {
  data: {
    dataFeeds: PhaseRawDataFeed[];
  };
  loading: boolean;
  networkStatus: number;
}

interface Price {
  blockTimestamp: string;
  blockNumber: string;
  id: string; // tx hash of the price update
  price: string;
  roundId: string;
}

interface PhaseRawDataFeed {
  id: string;
  live: boolean;
  phaseId: number;
  prices: Price[];
  decimals: number;
}

export const POST = async (req: Request) => {
  const body = await req.json();
  const timeFilter = body.timeFilter;
  const asset = body.asset;

  try {
    const data = await execute(GetAssetSpecificDocument, {
      asset: asset.toUpperCase(),
      timeFilter: timeFilter.toString(),
    });

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new NextResponse(`Graph Error ${error}`, { status: 500 });
  }
};
