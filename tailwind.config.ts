import type { Config } from "tailwindcss";

const config = {
    content: ["./src/**/*.{ts,tsx}"],
    theme: {
        container: {
            center: true,
            padding: "1rem",
        },
        extend: {},
    },
    plugins: [],
} satisfies Config;

export default config;
