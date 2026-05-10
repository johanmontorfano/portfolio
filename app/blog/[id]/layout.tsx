import { getBlogPostMetadata } from "@/scripts/fb_utils/blog_mgr";
import { ReactNode } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { ScrollToTopButton } from "@/components/scroll_to_top";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateMetadata(props: {
    params: Promise<{ id: string }>
}): Promise<Metadata> {
    const params = await props.params;
    const data = await getBlogPostMetadata(params.id);

    if (data !== null)
        return {
            title: "Johan's Blog – " + data.title,
            description: "Read Johan Delhomme Montorfano blog post about " + 
                data.title + "!",
            authors: {
                name: "Johan Delhomme Montorfano",
                url: "https://johanmontorfano.com"
            },
        }
    return {
        title: "Johan's Blog – Not Found"
    }
}

export default async function Layout(props: {
    params: Promise<{ id: string }>,
    children: ReactNode
}) {
    const params = await props.params;
    const data = await getBlogPostMetadata(params.id);

    if (data === null)
        notFound();
    return <div>
        <header className="pt-48">
            <Link href="/blog" className="btn btn-sm btn-ghost">
                <BsArrowLeft /> Latest Posts
            </Link>
            <br />
            <h1 className="text-4xl font-bold">{data.title}</h1>
            <p className="text-base-content/60 text-sm">
                {new Date(data.createdAt).toDateString()}
            </p>
            <div className="divider" />
        </header>
        <main>
            {props.children}
        </main>
        <footer>
            <div className="divider" />
            <div className="flex justify-center">
                <ScrollToTopButton />
            </div>
        </footer>
    </div>;
}
