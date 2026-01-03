import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        './layouts/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-sans)"],
                mono: ["var(--font-mono)"],
            },
        },
    },
    darkMode: "class",
    plugins: [
        heroui({
            // themes: {
            //     light: {
            //         colors: {
            //             background: "lightgray",
            //             foreground: "green",
            //         },
            //     },
            //     dark: {
            //         colors: {
            //             background: "#2e47d5",
            //             foreground: "#fafafa",
            //         },
            //     },
            // },
        }),],
}

module.exports = config;