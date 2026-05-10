import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

export default function NotFound() {
    return <div className="h-dvh flex flex-col justify-center items-center">
        <h1 className="text-4xl">Blog post not found!</h1>
        <br />
        <Link href="/blog" className="btn btn-ghost btn-primary">
            <BsArrowLeft /> See latest posts
        </Link>
    </div>
}
