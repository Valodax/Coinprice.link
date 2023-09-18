import { NextResponse } from "next/server";
import { GetAssetSpecificDocument, execute } from "@/.graphclient";

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
