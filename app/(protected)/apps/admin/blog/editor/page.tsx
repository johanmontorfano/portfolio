import { PostEditor } from "@/components/blog_mgr/editor";
import { redirect } from "next/navigation";
import { getBlogPost, getBlogPostMetadata } from "@/scripts/fb_utils/blog_mgr";

// NOTE: if no ID is provided, we will consider we are editing a new post
export default async function Page(props: {
    searchParams: Promise<{ id?: string }>
}) {
    const searchParams = await props.searchParams;
    const isNew = searchParams.id === undefined;

    const metadata = isNew ? {
        title: "",
        gcsExtlessName: "",
        createdAt: 0
    } : await getBlogPostMetadata(searchParams.id!);
    const body = isNew ? "# New Article" : await getBlogPost(searchParams.id!);

    if (metadata === null || body === null)
        redirect("/apps/admin/blog");
    return <PostEditor metadata={metadata} body={body} id={searchParams.id} />;
}
