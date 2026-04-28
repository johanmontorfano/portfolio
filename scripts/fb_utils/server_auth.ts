import { cookies } from "next/headers";
import { auth } from "../firebase/server";

async function getSessionCookie() {
    try {
        const sessionCookie = (await cookies()).get("session");

        if (sessionCookie)
            return sessionCookie.value;
        return undefined;
    } catch (_) {
        return undefined;
    }
}

export async function getUser() {
    const cookie = await getSessionCookie();

    if (!cookie) return null;

    try {
        return await auth.getUser((await auth.verifySessionCookie(cookie)).uid);
    } catch (e) {
        console.error(e);
        return null;
    }    
}
