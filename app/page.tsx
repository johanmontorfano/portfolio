"use client";

import { useASCIIEngine } from "@/components/ascii/context";
import { ASCIIImage } from "@/components/ascii/image";
import { useEffect } from "react";
import { Plasma } from "./ascii/plasma/page";

export default function Page() {
    const ascii = useASCIIEngine();

    useEffect(() => {
        ascii.attach("#main");
        ascii.addElement(new Plasma());
        ascii.addElement(new ASCIIImage("/logo.png"));
    }, []);

    return <div id="main" className="w-full h-dvh" />
}
