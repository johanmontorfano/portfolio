import { ReactNode } from "react";
import "@/app/index.css";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Johan Delhomme Montorfano's Portfolio",
}

export default function RootLayout(props: { children: ReactNode }) {
    return <html lang="en">
        <body className="bg-black text-white m-0 p-0 h-dvh">
            {props.children}
        </body>
    </html>
}
