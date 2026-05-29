import Image from "next/image";
import Link from "next/link";

import Logo from "@/public/assets/logo.svg";
import { BsPerson } from "react-icons/bs";

export function Navbar() {
    return <div className="navbar max-w-[800px] w-[90%] mx-auto sticky top-0 z-100">
        <div className="flex-1">
            <Link href="/">
                <Image alt="logo" src={Logo} className="w-10 h-10" />
            </Link>
        </div>
        <div className="flex gap-2 [&>a]:hover:text-base-content [&>a]:text-base-content/70 [&>a]:transition-colors">
            <Link href="/blog">Blog</Link>
            <Link href="/auth/redirect">Account</Link>
        </div>
        <div className="flex-1" />
    </div>
}
