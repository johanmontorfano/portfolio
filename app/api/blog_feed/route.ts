import { getLatestBlogPostsPaginated } from "@/scripts/fb_utils/blog_mgr";
import { NextRequest, NextResponse } from "next/server";

// will return blog post data paginated
export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const from = parseInt(url.searchParams.get("from") || "0");

    return NextResponse.json(await getLatestBlogPostsPaginated(from));
}
