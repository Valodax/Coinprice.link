"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Coins", href: "/" },
  // { name: "NFTs", href: "/nfts" },
  { name: "Fiat", href: "/fiat" },
];

export default function Header() {
  const pathName = usePathname();

  return (
    <header className="w-full h-[3rem]">
      <div className="flex justify-center items-center gap-10 pt-5 md:pt-10 w-fit h-full mx-auto text-sm md:text-lg">
        {navLinks.map(({ name, href }) => (
          <Link
            key={name}
            href={href}
            className={`font-medium hover:text-blue-400 ${
              pathName === href ? "text-blue-400" : ""
            } transition-colors ease-in-out duration-500`}
          >
            {name}
          </Link>
        ))}
      </div>
    </header>
  );
}
