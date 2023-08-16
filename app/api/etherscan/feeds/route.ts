import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    try {
        const response = await fetch(
            `https://api.etherscan.io/api?module=logs&action=getLogs&fromBlock=0&toBlock=17924424&address=0x47Fb2585D2C56Fe188D0E6ec628a38b74fCeeeDf&topic0=0x27a180c70f2642f63d1694eb252b7df52e7ab2565e3f67adf7748acb7d82b9bc&page=1&offset=1000&apikey=${process.env.ETHERSCAN_API_KEY}`
        );

        const data = await response.json();
        console.log(data);

        return new NextResponse(JSON.stringify(data), { status: 200 });
    } catch (error) {
        return new NextResponse("Database Error", { status: 500 });
    }
};
