import { Markdown } from "@/components/mini_md";
import { getBlogPost } from "@/scripts/fb_utils/blog_mgr";

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const data = await getBlogPost(params.id);

    if (data === null)
        return 404;
    return <Markdown content={data} />;
}
