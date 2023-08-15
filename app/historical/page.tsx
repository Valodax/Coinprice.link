"use client";
import HistoricalData from "@/components/HistoricalData";
import PageTransition from "@/components/PageTransition";
type IndexPageProps = {};
type IndexPageRef = React.ForwardedRef<HTMLDivElement>;
import { useContext } from "react";
import { NavigationDirectionContext } from "@/context/NavigationContext";

export default function Home(props: IndexPageProps, ref: IndexPageRef) {
    const { navigationDirection } = useContext(NavigationDirectionContext);
    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <PageTransition ref={ref}>
                <main className="flex-grow">
                    <HistoricalData key={navigationDirection} />
                </main>
            </PageTransition>
        </div>
    );
}
