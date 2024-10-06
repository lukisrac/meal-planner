import { defineConfig, defineTextStyles } from "@pandacss/dev";

const textStyles = defineTextStyles({
    h1: {
        description: "Heading 1",
        value: { fontSize: "48px", fontWeight: "400", lineHeight: "160%" },
    },
});

export default defineConfig({
    // Whether to use css reset
    preflight: true,

    // Where to look for your css declarations
    include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

    jsxFramework: "react",

    // Files to exclude
    exclude: [],

    // Useful for theme customization
    theme: {
        extend: { textStyles },
    },

    // The output directory for your css system
    outdir: "styled-system",
});
