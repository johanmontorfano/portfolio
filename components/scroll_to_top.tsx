"use client";

import { BsChevronDoubleUp } from "react-icons/bs";

export function ScrollToTopButton() {
    return <button className="btn btn-ghost" onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }}>
        <BsChevronDoubleUp />
        Scroll to top
    </button>
}
