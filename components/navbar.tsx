import Link from "next/link";

import Logo from "@/public/assets/logo-white.svg";
import Image from "next/image";

export function Navbar() {
    return <div
        className="navbar max-w-[800px] w-[90%] mx-auto sticky top-0 z-100"
    >
        <div className="flex gap-4 [&>a]:hover:text-base-content [&>a]:text-base-content/70 [&>a]:transition-colors mx-auto">
            <Link href="/">
                <Image alt="logo" src={Logo} className="w-8 h-8" />
            </Link>
            <div className="divider divider-horizontal" />
            <Link
                href="https://linkedin.com/in/jhnm"
                className="max-sm:hidden"
            >
                LinkedIn
            </Link>
            <Link
                href="https://codeland.johanmontorfano.com/johan"
                className="max-sm:hidden"
            >
                Codeland
            </Link>
            <Link
                href="https://github.com/johanmontorfano"
                className="max-sm:hidden"
            >
                GitHub
            </Link>
            <div className="divider divider-horizontal max-sm:hidden" />
            <Link href="/blog">Blog</Link>
            <Link href="/auth/redirect">Account</Link>
        </div>
    </div>
}
