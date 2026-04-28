import { TopBar } from "@/components/top_bar";
import { ReactNode } from "react";

export default function Layout(props: { children: ReactNode }) {
    return <div>
        <TopBar />
        <div className="flex justify-center w-full">
            <div className="w-[90%] max-w-[1000px] mx-auto">
                {props.children}
            </div>
        </div>
    </div>
}
