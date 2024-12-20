import type { Config } from "tailwindcss";

const PRIMARY_COLORS = {
    DEFAULT: "#F5484A",
    900: "#F5484A",
    800: "#F65A5C",
    700: "#F76D6E",
    600: "#F87F80",
    500: "#F99192",
    400: "#FAA4A5",
    300: "#FBB6B7",
    200: "#FCC8C9",
    100: "#FDDADB",
    50: "#FEEDED",
};

const SECONDARY_COLORS = {
    DEFAULT: "#FF9800",
    900: "#FF9800",
    800: "#FFA21A",
    700: "#FFAD33",
    600: "#FFB74D",
    500: "#FFC166",
    400: "#FFCC80",
    300: "#FFD699",
    200: "#FFE0B3",
    100: "#FFEACC",
    50: "#FFF5E6",
};

const GRAYSCALE_COLORS = {
    900: "#212121",
    800: "#424242",
    700: "#616161",
    600: "#757575",
    500: "#9E9E9E",
    400: "#BDBDBD",
    300: "#E0E0E0",
    200: "#EEEEEE",
    100: "#F5F5F5",
    50: "#FAFAFA",
};

const BACKGROUND_COLORS = {
    red: "#FFF4F4",
    yellow: "#FFFCEB",
    orange: "#FFF8EE",
    green: "#F1FDF5",
    blue: "#F6F9FF",
    purple: "#F9F8FF",
    teal: "#F2FFFD",
};

const TRANSPARENT_COLORS = {
    DEFAULT: "transparent",
    red: "#F5484A14",
    yellow: "#FFD30014",
    orange: "#F8930014",
    green: "#1BAC4B14",
    blue: "#246BFD14",
    purple: "#6949FF14",
    teal: "#019B8314",
    cyan: "#00BCD414",
};

const COLORS = {
    primary: PRIMARY_COLORS,
    secondary: SECONDARY_COLORS,
    grayscale: GRAYSCALE_COLORS,
    background: BACKGROUND_COLORS,
    transparent: TRANSPARENT_COLORS,
    success: "#12D18E",
    info: "#246BFD",
    warning: "#FACC15",
    error: "#F75555",
    disabled: "#D8D8D8",
    disabledButton: "#C43A3B",
    red: "#F54336",
    pink: "#EA1E61",
    purple: "#9D28AC",
    deepPurple: "#673AB3",
    indigo: "#3F51B2",
    blue: "#1A96F0",
    lightBlue: "#00A9F1",
    cyan: "#00BCD3",
    teal: "#009689",
    green: "#4AAF57",
    lightGreen: "#8BC255",
    lime: "#CDDC4C",
    yellow: "#FFEB4F",
    amber: "#FFC02D",
    orange: "#FF981F",
    deepOrange: "#FF5726",
    brown: "#7A5548",
    blueGrey: "#607D8A",
    dark1: "#181A20",
    dark2: "#1F222A",
    dark3: "#262A35",
    dark4: "#35383F",
};

const config = {
    content: ["./src/**/*.{ts,tsx}"],
    theme: {
        container: {
            center: true,
            padding: "1rem",
        },
        extend: {
            colors: COLORS,
            fontSize: {
                h1: ["48px", "160%"],
                h2: ["40px", "160%"],
                h3: ["32px", "160%"],
                h4: ["24px", "160%"],
                h5: ["20px", "160%"],
                h6: ["18px", "160%"],
                bodyXl: ["18px", "140%"],
                bodyLg: ["16px", "140%"],
                bodyMd: ["14px", "140%"],
                bodySm: "12px",
                bodyXs: "10px",
            },
        },
    },
    plugins: [],
} satisfies Config;

export default config;
