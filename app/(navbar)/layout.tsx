import { Navbar } from "@/components/navbar";
import { ReactNode } from "react";

export default function Layout(props: { children: ReactNode }) {
    return <>
        <Navbar />
        {props.children}
    </>
}
