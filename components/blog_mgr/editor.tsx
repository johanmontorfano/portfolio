"use client";

import { useState, useMemo } from "react";
import { BlogPostMetadata } from "@/scripts/fb_utils/blog_mgr";
import { BsJournal, BsPencil } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { Markdown } from "../mini_md";

export function PostEditor(props: {
    metadata: BlogPostMetadata;
    body: string;
    id?: string;
}) {
    const [content, setContent] = useState(props.body);
    const [metadata, setMetadata] = useState(props.metadata);
    const router = useRouter();

    const readingTime = useMemo(() => {
        const words = content.trim().split(/\s+/).length;
        return Math.ceil(words / 200);
    }, [content]);

    return (
        <div className="flex h-full flex-col bg-base-200 rounded-box shadow-xl overflow-hidden border border-base-300">
            <div className="navbar bg-base-100 border-b border-base-300 px-4">
                <div className="flex-1 flex flex-col items-start text-left">
                    <h2 className="text-lg font-bold">Post Editor</h2>
                    <span className="text-xs opacity-60">
                        {props.id ? `${props.id}` : "New"} • Estimated{" "}
                        {readingTime} min read
                    </span>
                </div>
                <div className="flex-none gap-2">
                    <button
                        className="btn btn-primary btn-sm md:btn-md"
                        onClick={async () => {
                            const res = await fetch("/api/blog", {
                                method: "POST",
                                body: JSON.stringify({
                                    id: props.id,
                                    metadata,
                                    body: content
                                })
                            });
                            const data = await res.json();

                            if (data.ok) router.back();
                        }}
                    >
                        Save
                    </button>
                </div>
            </div>
            <div className="tabs tabs-border">
                <label className="tab">
                    <input type="radio" name="editor" defaultChecked />
                    <BsPencil />
                    Editor
                </label>
                <div className="tab-content bg-base-100 p-4">
                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text font-semibold">
                                Title
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="Post Title"
                            className="input input-bordered w-full"
                            value={metadata.title}
                            onChange={(e) =>
                                setMetadata({
                                    ...metadata,
                                    title: e.target.value,
                                })
                            }
                        />
                    </div>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Body (MD)</legend>
                        <textarea
                            className="textarea textarea-bordered w-full h-[50dvh] font-mono text-base resize-none"
                            placeholder="Write your story here..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </fieldset>
                </div>
                <label className="tab">
                    <input type="radio" name="editor" />
                    <BsJournal />
                    Preview
                </label>
                <div className="tab-content bg-base-100 p-4">
                    <div className="prose max-w-none prose-headings:mb-2 prose-p:my-2">
                        <div>
                            <h1>
                                {metadata.title || "Untitled Post"}
                            </h1>
                            <div className="divider"></div>
                        </div>
                        <Markdown content={content} />
                    </div>
                </div>
            </div>
        </div>
    );
}
