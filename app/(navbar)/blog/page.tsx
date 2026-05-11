"use client";

import { BlogPostMetadata } from "@/scripts/fb_utils/blog_mgr";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const [posts, setPosts] = useState<BlogPostMetadata[]>([]);
    const [loading, setLoading] = useState(false);
    const [allLoaded, setAllLoaded] = useState(false);
    const router = useRouter();

    async function getLatestPostsMetadataPaginated() {
        setLoading(true);

        const res = await fetch("/api/blog_feed?from=" + posts.length);

        if (res.status > 199 && res.status < 300) {
            const data = await res.json();

            setPosts(prev => [...prev, ...data.posts]);
            if (!data.posts.length)
                setAllLoaded(true);
        }
        setLoading(false);
    }

    useEffect(() => {
        getLatestPostsMetadataPaginated();
    }, []);

    return <div>
        <header className="pt-48">
            <h1 className="text-4xl font-bold">Johan's Blog</h1>
        </header>
        <br />
        <main>
            <ul className="list">
                <li className="font-bold text-xl">Latest posts</li>
                {posts.map(post => <li
                    key={post.gcsExtlessName}
                    className="list-row cursor-pointer hover:underline"
                    onClick={() => router.push("/blog/" + post.gcsExtlessName)}
                >
                    <p>{post.title}</p>
                    <p className="opacity-60">{
                        new Date(post.createdAt).toDateString()
                    }</p>
                </li>)}
            </ul>
            {!allLoaded && <div className="flex justify-center">
                <button
                    className="btn disabled:btn-disabled"
                    disabled={loading}
                    onClick={() => getLatestPostsMetadataPaginated()}
                >
                    {loading ?
                        <span className="loading loading-spinner" /> :
                        "Load More"
                     }
                </button>
            </div>}
        </main>
    </div>
}
