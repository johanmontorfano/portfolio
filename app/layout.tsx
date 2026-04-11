import { ReactNode } from "react";
import { Metadata } from "next";
import { grotesk } from "@/components/fonts";
import "@/app/index.css";

export const metadata: Metadata = {
    title: "Johan's (amazing) portfolio",
}

export default function RootLayout(props: { children: ReactNode }) {
    return <html lang="en">
        <body className={`m-0 p-0 h-dvh ${grotesk.className}`}>
            {props.children}
        </body>
    </html>
}
