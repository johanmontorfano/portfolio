import { Navbar } from "@/components/admin_navbar";
import { ReactNode } from "react";

export default function Layout(props: { children: ReactNode }) {
    return <div className="w-full w-[90%] max-w-[1000px] mx-auto">
        <Navbar links={[]} />
        <header className="pt-48">
            <h1 className="text-4xl font-bold">Lyondle Manager</h1>
        </header>
        <div className="pt-4">
            {props.children}
        </div>
    </div>
}
