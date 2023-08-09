"use client";

import { ThirdwebProvider } from "@thirdweb-dev/react";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

export default function Web3Provider({ children }: any) {
    return (
        <ThirdwebProvider activeChain={"ethereum"} clientId={clientId}>
            {children}
        </ThirdwebProvider>
    );
}
