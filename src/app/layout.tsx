import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { ReactNode, Suspense } from "react";
import "@/styles/globals.css";

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

export default function RootLayout(props: { children: ReactNode }) {
    return (
        <html className={urbanist.className} lang="cs">
            <body className="h-screen w-screen">
                {/* <Providers> */}
                <main className="h-full">
                    <Suspense>{props.children}</Suspense>
                </main>
                {/* </Providers> */}
            </body>
        </html>
    );
}
