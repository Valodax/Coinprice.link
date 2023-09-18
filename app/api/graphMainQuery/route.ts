import { NextResponse } from "next/server";
import { GetMainAllUsdDocument, execute } from "@/.graphclient";

export const GET = async (req: Request) => {
  try {
    const data = await execute(GetMainAllUsdDocument, { timeFilter: Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60 });

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new NextResponse(`Graph Error ${error}`, { status: 500 });
  }
};
