import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Web3Provider from "@/components/ThirdWebProvider";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ContextProvider from "@/components/ContextProvider"; // All context providers are wrapped here
import {Analytics} from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "CoinPrice.LINK",
    description: "A Website to view current and historical price data from Chainlink PriceFeeds",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${inter.className} flex flex-col min-h-screen`}>
                <Web3Provider>
                    <ContextProvider>
                        <Header />
                        <Hero />
                        <main className="flex-grow pb-4">
                        {children}
                        <Analytics/>
                        </main>
                        <Footer />
                    </ContextProvider>
                </Web3Provider>
            </body>
        </html>
    );
}
