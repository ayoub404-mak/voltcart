/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        "./app/**/*.{js,jsx,ts,tsx,mdx}",
        "./components/**/*.{js,jsx,ts,tsx,mdx}",
        "./assets/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    primary: "#4648d4",
                    "primary-dark": "#383ab2",
                    secondary: "#006e2f",
                    ink: "#111827",
                    muted: "#64748b",
                },
            },
            fontSize: {
                "about-hero": ["4.75rem", { lineHeight: "1.05", letterSpacing: "0" }],
                "display-sm": ["2.75rem", { lineHeight: "1.1", letterSpacing: "0" }],
            },
        },
    },
    plugins: [],
};

export default config;
