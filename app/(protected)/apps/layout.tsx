import { Navbar } from "@/components/admin_navbar";
import { ReactNode } from "react";

export default async function Layout(props: { children: ReactNode }) {
    return <div className="w-[90%] max-w-[1000px] mx-auto">
        <Navbar />
        {props.children}
    </div>
}
