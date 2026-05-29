import MD from "react-markdown";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import "@/app/md.css";

export function Markdown(props: { content: string }) {
    return <div className="md-container">
        <MD rehypePlugins={[rehypeSlug, remarkGfm]}>{props.content}</MD>
    </div>
}
