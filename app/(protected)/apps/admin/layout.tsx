import { Navbar } from "@/components/admin_navbar";
import { ReactNode } from "react";

export default function Layout(props: { children: ReactNode }) {
    return <div>
        <Navbar />
        <div className="flex justify-center w-full">
            <div className="w-[90%] max-w-[1000px] mx-auto">
                {props.children}
            </div>
        </div>
    </div>
}
