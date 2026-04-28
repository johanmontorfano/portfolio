"use client";

import { smoother } from "@/scripts/smooth_scroll";
import { useEffect } from "react";

export function DocumentSmoothScroll() {
    useEffect(() => {
        if (typeof window !== "undefined")
            smoother(document.scrollingElement!, 30, 30);
    }, []);

    return null;
}
