import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Hero />
            <main className="flex-grow">THIS IS A TEST</main>
            <Footer />
        </div>
    );
}
