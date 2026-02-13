import { ReactNode } from "react";
import "@/app/index.css";

export default function RootLayout(props: { children: ReactNode }) {
    return <html lang="en">
        <body className="bg-black text-white m-0 p-0 h-dvh">
            {props.children}
        </body>
    </html>
}
