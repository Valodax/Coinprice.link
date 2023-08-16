import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            width: {
                "0.5/12": "4.1666667%",
                "0.75/12": "6.25%",
                "1.5/12": "12.5%",
                "2.5/12": "20.833333%",
                "3.5/12": "29.166667%",
                "4.5/12": "37.5%",
                "5.5/12": "45.833333%",
            },
        },
    },
    plugins: [],
};
export default config;
