"use client";

import PriceTable from "@/components/Coins/PriceTable";
import PageTransition from "@/components/PageTransition";
type IndexPageProps = {};
type IndexPageRef = React.ForwardedRef<HTMLDivElement>;

import { useContext } from "react";
import { NavigationDirectionContext } from "@/context/NavigationContext";

export default function Home(props: IndexPageProps, ref: IndexPageRef) {
    const { navigationDirection } = useContext(NavigationDirectionContext);

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <PageTransition ref={ref} key={navigationDirection}>
                <main className="flex-grow">
                    <PriceTable />
                </main>
            </PageTransition>
        </div>
    );
}
