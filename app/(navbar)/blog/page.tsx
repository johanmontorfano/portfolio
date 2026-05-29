import { getLatestBlogPostsPaginated } from "@/scripts/fb_utils/blog_mgr";
import Link from "next/link";

export default async function Page() {
    const { posts } = await getLatestBlogPostsPaginated(0, 5000);

    return <div>
        <header className="pt-48">
            <h1 className="text-4xl font-bold">Johan's Blog</h1>
        </header>
        <br />
        <main>
            <ul className="list">
                {posts.map(post => <li
                    key={post.gcsExtlessName}
                    className="cursor-pointer border-b border-base-300 hover:bg-base-200"
                >
                    <Link href={`/blog/${post.gcsExtlessName}`} className="list-row">
                        <p>{post.title}</p>
                        <p className="opacity-60">{
                            new Date(post.createdAt).toDateString()
                        }</p>
                    </Link>
                </li>)}
            </ul>
        </main>
    </div>
}
