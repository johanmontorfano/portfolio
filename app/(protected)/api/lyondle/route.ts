// both routes acts as proxies implementing the authorization header to query
// lyondle

import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await fetch(
            "https://www.lyondle.fr/api/data/navbar",
            {
                headers: {
                    "Authorization": `Bearer ${process.env.LYONDLE_SECRET}`
                }
            }
        );
        const body = await res.json();

        if (res.ok) return NextResponse.json({ title: body.title });
        else throw Error("Request error");
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "query failed" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const res = await fetch(
            "https://www.lyondle.fr/api/data/navbar",
            {
                method: "POST",
                body: JSON.stringify(await req.json()),
                headers: {
                    "Authorization": `Bearer ${process.env.LYONDLE_SECRET}`
                }
            }
        );

        if (res.ok) return NextResponse.json({ success: true });
        else throw Error("Request error");
    } catch (e) {
        console.error(e);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
