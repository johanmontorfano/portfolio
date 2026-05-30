"use client";

import { useState } from "react";
import { BsTrash } from "react-icons/bs";

export function DeleteButton(props: { id: string }) {
    const [loading, setLoading] = useState(false);

    return <button
        className="btn btn-primary btn-square btn-sm"
        onClick={async () => {
            setLoading(true);
            await fetch("/api/blog?id=" + props.id, { method: "DELETE" });
            setLoading(false);
            window.location.reload();
        }}
    >
        {loading ?
            <span className="loading loading-spinner" /> :
            <BsTrash className="w-3.5 h-3.5" />
        }
    </button>
}
