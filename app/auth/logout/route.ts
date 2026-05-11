import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const cookieStore = await cookies();

    cookieStore.delete("session");
    return NextResponse.redirect(`${url.origin}/`);
}
