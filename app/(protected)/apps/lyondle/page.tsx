"use client";

import { useEffect, useState } from "react";

export default function Page() {
    const [currentTitle, setCurrentTitle] = useState("Loading title...");
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");

    async function getCurrentTitle() {
        try {
            const res = await fetch("/api/lyondle");
            const body = await res.json();

            if (res.ok) setCurrentTitle(body.title);
            else throw Error("Request error");
        } catch (e) {
            console.error(e);
            setCurrentTitle("...");
        }
    }

    async function handleSubmit() {
        setLoading(true);
        try {
            const res = await fetch("/api/lyondle", {
                method: "POST",
                body: JSON.stringify({ title }),
                headers: {
                    "Authorization": `Bearer ${process.env.LYONDLE_SECRET}`
                }
            });
            const body = await res.json();

            if (res.ok) {
                setCurrentTitle(body.title)
                setTitle("");
            } else throw Error("Request error");
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCurrentTitle();
    }, []);

    return <div>
        <div>
            <p>Navigation bar display title</p>
            <form className="flex gap-1" onSubmit={async e => {
                e.preventDefault();
                await handleSubmit();
            }}>
                <input
                    type="text"
                    placeholder={currentTitle}
                    className="input"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <button type="submit" className="btn" disabled={loading}>
                    {loading ?
                        <span className="loading loading-spinner" /> :
                        "Save"
                    }
                </button>
            </form>
        </div>
    </div>
}
