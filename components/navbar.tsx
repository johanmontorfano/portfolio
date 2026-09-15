import Link from "next/link";

export function Navbar() {
    return <div
        className="navbar max-w-[800px] w-[90%] mx-auto sticky top-0 z-100"
    >
        <div className="flex gap-4 [&>a]:hover:text-base-content [&>a]:text-base-content/70 [&>a]:transition-colors mx-auto">
            <Link href="https://linkedin.com/in/jhnm">LinkedIn</Link>
            <Link href="https://codeland.johanmontorfano.com/johan">
                Codeland
            </Link>
            <Link href="https://github.com/johanmontorfano">
                GitHub
            </Link>
            <div className="divider divider-horizontal" />
            <Link href="/blog">Blog</Link>
            <Link href="/auth/redirect">Account</Link>
        </div>
    </div>
}
