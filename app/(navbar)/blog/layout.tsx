import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Johan's Blog – Latest",
    description: "Read latest blog entries from Johan Delhomme Montorfano and subscribe to the newsletter"
}

export default function Layout(props: { children: ReactNode }) {
    return <div className="max-w-[800px] w-[90%] mx-auto">
        {props.children}
    </div>
}
