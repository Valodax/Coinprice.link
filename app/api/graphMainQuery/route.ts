import { NextResponse } from "next/server";
import { GetMainAllUsdDocument, GetMainAllUsdQuery, execute } from "@/.graphclient";

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
  try {
    const data = await execute(GetMainAllUsdDocument, { timeFilter: Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60 });

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new NextResponse(`Graph Error ${error}`, { status: 500 });
  }
};
