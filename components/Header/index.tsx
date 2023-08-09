import Link from "next/link";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Live Analytics", href: "/#data" },
];

export default function Header() {
    return (
        <header className="w-full h-[3rem]">
            <div className="flex justify-center items-center gap-5 w-fit h-full mx-auto">
                {navLinks.map(({ name, href }) => (
                    <Link
                        key={name}
                        href={href}
                        className="font-medium hover:text-sky-500 transition-colors ease-in-out duration-500"
                    >
                        {name}
                    </Link>
                ))}
            </div>
        </header>
    );
}
