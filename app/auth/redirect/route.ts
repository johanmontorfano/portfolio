import { auth } from "@/scripts/firebase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

const postBody = z.object({ token: z.string() });

// this route is made to set the provided token ID in a cookie and it redirects
// the user to the appropriate app
export async function POST(req: NextRequest) {
    const json = await req.json();
    const body = postBody.safeParse(json);

    if (body.error) {
        console.error(body.error);
        return NextResponse.json({ error: "invalid body" }, { status: 400 });
    }

    const expiresIn = 60 * 60 * 12 * 1000;
    const cookieStore = await cookies();

    return await auth.createSessionCookie(body.data.token, { expiresIn })
        .then(cookie => {
            cookieStore.set("session", cookie, {
                maxAge: expiresIn,
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development"
            });
            // TODO: in the future, this project might contains more than me as
            // users and those users might not all have access to the same
            // things. therefore, this return statement might evolve in a more
            // complete permission system
            return NextResponse.json({ appUrl: "/apps/admin" });
        })
        .catch(err => {
            console.log(err);
            return NextResponse.json(
                { error: "session init failed" },
                { status: 500 }
            );
        });
}
