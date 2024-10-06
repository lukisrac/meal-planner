import { type Metadata } from "next";
import { Urbanist } from "next/font/google";
import { ReactNode } from "react";
import { Providers } from "@/providers/providers";
import "@/styles/index.css";
import { css } from "../../styled-system/css";

//import "@/styles/globals.css";

export const metadata: Metadata = {
    title: "Jídelníček",
    description: "Jídelníček",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const urbanist = Urbanist({
    display: "swap",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
    children,
}: Readonly<{ children: ReactNode }>) {
    return (
        <html className={urbanist.className} lang="cs">
            <body className={css({ width: "screen", height: "screen" })}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
