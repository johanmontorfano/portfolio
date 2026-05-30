import { BlogPostMetadata, putBlogPost, removeBlogPost } from "@/scripts/fb_utils/blog_mgr";
import { getUser } from "@/scripts/fb_utils/server_auth";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";
import z from "zod";

const postBody = z.object({
    id: z.string().optional(),
    metadata: z.object({
        title: z.string(),
        gcsExtlessName: z.string(),
        createdAt: z.number()
    }),
    body: z.string()
});

// will create/modify a blog post depending on the presence of the id property
export async function POST(req: NextRequest) {
    const user = await getUser();

    if (user === null)
        return NextResponse.json({ error: "not logged in" }, { status: 403 });

    const body = postBody.safeParse(await req.json());

    if (body.error) {
        console.log(body.error);
        return NextResponse.json({ error: "invalid req" }, { status: 400 });
    }

    // if there is no ID, we create one
    if (!body.data.id)
        body.data.id = v4();

    const ok = await putBlogPost(
        body.data.id,
        body.data.metadata as BlogPostMetadata,
        body.data.body
    );

    if (ok) {
        revalidatePath("/blog");
        revalidatePath("/apps/admin/blog");
    }
    return NextResponse.json({ ok });
}

// will delete the GCS and metadata payloads of a blog post
export async function DELETE(req: NextRequest) {
    const user = await getUser();

    if (user === null)
        return NextResponse.json({ error: "not logged in" }, { status: 403 });

    const url = new URL(req.url);

    if (!url.searchParams.has("id"))
        return NextResponse.json({ error: "invalid req" }, { status: 400 });

    const ok = await removeBlogPost(url.searchParams.get("id")!);

    if (ok) {
        revalidatePath("/blog");
        revalidatePath("/apps/admin/blog");
    }
    return NextResponse.json({ ok });
}
