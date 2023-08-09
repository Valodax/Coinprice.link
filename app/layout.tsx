import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Web3Provider from "@/components/ThirdWebProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Chainlink Historical PriceFeed Website",
    description: "A Website to view current and historical price data from Chainlink PriceFeeds",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Web3Provider>{children}</Web3Provider>
            </body>
        </html>
    );
}
