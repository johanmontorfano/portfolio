import { getUser } from "@/scripts/fb_utils/server_auth";
import { auth } from "@/scripts/firebase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

const postBody = z.object({ token: z.string() });

// this route is made to properly redirect any request meant to be
// authenticated towards the correct page, depending on the auth state
export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const user = await getUser();

    if (user === null) return NextResponse.redirect(url.origin + "/auth");
    else return NextResponse.redirect(url.origin + "/apps/admin/files");
}

// this route is made to set the provided token ID in a cookie and it redirects
// the user to the appropriate app
export async function POST(req: NextRequest) {
    const json = await req.json();
    const body = postBody.safeParse(json);

    if (body.error) {
        console.error(body.error);
        return NextResponse.json({ error: "invalid body" }, { status: 400 });
    }

    const expiration = 60 * 60 * 12;
    const cookieStore = await cookies();

    try {
        const cookie = await auth.createSessionCookie(body.data.token, {
            expiresIn: expiration * 1000
        });

        cookieStore.set("session", cookie, {
            maxAge: expiration,
            httpOnly: true,
            sameSite: "strict",
            path: "/"
        });

        // TODO: in the future, this project might contains more than me as
        // users and those users might not all have access to the same
        // things. therefore, this return statement might evolve in a more
        // complete permission system
        return NextResponse.json({ appUrl: "/apps/admin/files" });
    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { error: "session init failed" },
            { status: 500 }
        );
    }
}
