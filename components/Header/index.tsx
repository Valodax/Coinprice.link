"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useContext } from "react";
import { NavigationDirectionContext } from "@/context/NavigationContext";

const navLinks = [
    { name: "Coin Prices", href: "/" },
    { name: "NFT Prices", href: "/nfts" },
    { name: "Oracle Data", href: "/historical" },
];

export default function Header() {
    const router = useRouter();
    const pathName = usePathname();
    const lastPathRef = useRef("");
    const { setNavigationDirection } = useContext(NavigationDirectionContext);

    useEffect(() => {
        const lastPathIndex = navLinks.findIndex((link) => link.href === lastPathRef.current);
        const currentPathIndex = navLinks.findIndex((link) => link.href === pathName);
        let direction = "left";
        if (lastPathIndex < currentPathIndex) {
            direction = "right";
        } else if (lastPathIndex > currentPathIndex) {
            direction = "left";
        }

        lastPathRef.current = pathName;
        setNavigationDirection(direction);
    }, [pathName]);
    return (
        <header className="w-full h-[3rem]">
            <div className="flex justify-center items-center gap-10 pt-5 md:pt-10 w-fit h-full mx-auto text-sm md:text-lg">
                {navLinks.map(({ name, href }) => (
                    <button
                        key={name}
                        onClick={() => {
                            router.push(href);
                        }}
                        className={`font-medium hover:text-blue-400 ${
                            pathName === href ? "text-blue-400" : ""
                        } transition-colors ease-in-out duration-500`}
                    >
                        {name}
                    </button>
                ))}
            </div>
        </header>
    );
}
