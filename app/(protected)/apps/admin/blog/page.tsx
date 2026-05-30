import { DeleteButton } from "@/components/blog_mgr/delete";
import { getLatestBlogPostsPaginated } from "@/scripts/fb_utils/blog_mgr";
import Link from "next/link";
import { BsPencil, BsPlus, BsTrash } from "react-icons/bs";

export default async function Page() {
    const posts = (await getLatestBlogPostsPaginated(0, 1000)).posts;

    async function deleteBlogPost(id: string) {
        const res = await fetch("/api/blog?id=" + id, { method: "DELETE" });
        const data = await res.json();

        if (data.ok) {
            setPosts(prev => prev.filter(p => p.gcsExtlessName !== id));
        }
    }

    return <div>
        <header className="pt-48">
            <h1 className="text-4xl font-bold">Blog Manager</h1>
            <p>The blog manager is used to manage the portfolio's blog</p>
        </header>
        <br />
        <main>
            <div className="py-4 flex justify-end">
                <Link href="/apps/admin/blog/editor?new" className="btn btn-neutral gap-2">
                    <BsPlus /> Create
                </Link>
            </div>
            <table className="table table-zebra w-full">
                <thead>
                    <tr className="bg-base-200/50">
                        <th>Title</th>
                        <th>Created At</th>
                        <th className="text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post => <tr
                        key={post.gcsExtlessName}
                        className="hover"
                    >
                        <td>{post.title}</td>
                        <td>{new Date(post.createdAt).toDateString()}</td>
                        <td>
                            <div className="flex justify-end gap-2">
                                <DeleteButton id={post.gcsExtlessName} />
                                <Link
                                    href={"/apps/admin/blog/editor?id=" +
                                        post.gcsExtlessName}
                                    className="btn btn-primary btn-square btn-sm"
                                >
                                    <BsPencil className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </main>
    </div>
}
