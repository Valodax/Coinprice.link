import { NextResponse } from "next/server";
import { BigQuery } from "@google-cloud/bigquery";

export const GET = async (req: Request) => {
  const credential = JSON.parse(Buffer.from(process.env.GOOGLE_SERVICE_KEY as string, "base64").toString());
  const bigqueryClient = new BigQuery({
    projectId: "coinpricelink",
    credentials: {
      client_email: credential.client_email,
      private_key: credential.private_key,
    },
  });

  const query = `
    SELECT 
      block_timestamp AS Time,
      topics[OFFSET(0)] AS Topic,
      topics[OFFSET(1)] AS Numerator, 
      topics[OFFSET(2)] AS Denominator, 
      topics[OFFSET(3)] AS AggregatorAddress,
      CASE 
        WHEN topics[OFFSET(3)] = '0x0000000000000000000000000000000000000000000000000000000000000000' THEN 'Deprecated'
        ELSE 'Live'
      END AS Status
    FROM 
      \`coinpricelink.Chainlink_Feed_Registry.Chainlink-Feed-Registry\` 
    WHERE 
      topics[OFFSET(0)] = "0x27a180c70f2642f63d1694eb252b7df52e7ab2565e3f67adf7748acb7d82b9bc"
  `;

  try {
    const options = { query };
    const [rows] = await bigqueryClient.query(options);

    console.log(rows);

    return new NextResponse(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(`Error: ${error}`, { status: 500 });
  }
};
