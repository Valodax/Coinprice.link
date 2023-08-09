import Link from "next/link";
import { links, legal } from "@/utils/Data/FooterLinks";

export default function Footer() {
    return (
        <footer className="flex flex-col items-center justify-center w-full h-24">
            <div className="flex items-center justify-center space-x-4">
                {links.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className="text-[1rem] font-medium text-gray-500 hover:text-blue-600 transition-colors ease-in-out duration-500"
                    >
                        {link.name}
                    </Link>
                ))}
            </div>

            <div className="flex items-center justify-center mt-4 space-x-6">
                {legal.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className="text-[.8rem] font-medium text-gray-500 hover:text-blue-600 transition-colors ease-in-out duration-500"
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
        </footer>
    );
}
