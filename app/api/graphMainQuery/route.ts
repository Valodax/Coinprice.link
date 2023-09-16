import { NextResponse } from "next/server";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { usdOnlyWithHistorical } from "@/utils/TheGraphQueries";

const url = `https://gateway.thegraph.com/api/${process.env.THE_GRAPH_API_KEY}/subgraphs/id/Fi4Vo18y9yZLVdCttcSie1yeKrUaTTQb5Ndz64ZnYvU9`;

interface ApolloResult {
  data: {
    dataFeeds: RawDataFeed[];
  };
  loading: boolean;
  networkStatus: number;
}

interface Price {
  price: string;
  blockTimestamp: string;
  roundId: string;
}

interface RawDataFeed {
  name: string;
  id: string;
  decimals: number;
  prices: Price[];
  asset: string;
  assetAddress: string;
  denomination: string;
  denominationAddress: string;
}

export const GET = async (req: Request) => {
  const client = new ApolloClient({
    uri: url,
    cache: new InMemoryCache(),
  });

  try {
    const data: ApolloResult = await client.query({
      query: gql(usdOnlyWithHistorical),
    });

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new NextResponse(`Graph Error ${error}`, { status: 500 });
  }
};
