import { ReactNode } from "react";

export default function Layout(props: { children: ReactNode }) {
    return <div className="w-full">
        <div className="w-full bg-red-500 py-2">
            <p className="text-center text-sm">
                Those pages are used for debug purposes
            </p>
        </div>
        {props.children}
    </div>
}
