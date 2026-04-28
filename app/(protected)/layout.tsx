import { getUser } from "@/scripts/fb_utils/server_auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// NOTE: a protected layout is a layout that ensures that an user is logged in
// to allow navigation
// TODO: [note about permissionful auth system evolution]
// ----> see @/app/auth/redirect/route.ts TODO-1
export default async function ProtectedLayout(props: { children: ReactNode }) {
    const user = await getUser();

    if (user === null) {
        const headerslist = await headers();
        const pathname = headerslist.get("x-current-path");

        redirect("/auth?next=" + pathname);
    } else return props.children;
}
