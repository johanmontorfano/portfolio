import { createFileAndGetUploadURL } from "@/scripts/fb_utils/file_mgr";
import { getUser } from "@/scripts/fb_utils/server_auth";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const postBody = z.object({
    filename: z.string(),
    description: z.string(),
    identityBound: z.boolean(),
    boundToEmails: z.array(z.string())
})

// Creates a new file in the db and returns a link to upload the file content
// to
export async function POST(req: NextRequest): Promise<NextResponse> {
    const user = await getUser();

    if (user === null)
        return NextResponse.json({ error: "not logged in" }, { status: 403 });

    const body = postBody.safeParse(await req.json());

    if (body.error)
        return NextResponse.json({ error: "invalid req" }, { status: 400 });

    try {
        return NextResponse.json({ uploadUrl: await createFileAndGetUploadURL(
            body.data.filename,
            body.data.description,
            body.data.identityBound,
            body.data.boundToEmails
        )});
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { error: "failed to create ref" },
            { status: 500 }
        );
    }
}
