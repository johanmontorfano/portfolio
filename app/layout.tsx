import { ReactNode } from "react";
import { Metadata } from "next";
import { grotesk } from "@/components/fonts";
import { Navbar } from "@/components/navbar";

import "@/app/index.css";

export const metadata: Metadata = {
    title: "Johan's (amazing) portfolio",
    icons: {
        icon: "/assets/logo.svg"
    }
}

export default function RootLayout(props: { children: ReactNode }) {
    return <html lang="en">
        <body className={`m-0 p-0 ${grotesk.className}`}>
            <Navbar />
            {props.children}
        </body>
    </html>
}
