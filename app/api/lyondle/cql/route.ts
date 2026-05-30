// both routes acts as proxies implementing the authorization header to make
// queries r/w

import { getUser } from "@/scripts/fb_utils/server_auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const user = await getUser();

    if (user === null)
        return NextResponse.json({ error: "not logged in" }, { status: 403 });

    try {
        const res = await fetch(
            "https://api.lyondle.fr/cql",
            {
                method: "POST",
                body: JSON.stringify(await req.json()),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.COLOSSE_SECRET}`
                }
            }
        );

        if (res.ok) return NextResponse.json(await res.json());
        else throw Error("Request error");
    } catch (e) {
        console.error(e);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
