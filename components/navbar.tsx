import Image from "next/image";
import Link from "next/link";

import Logo from "@/public/assets/logo.svg";

export function Navbar() {
    return <div className="navbar max-w-[800px] w-[90%] mx-auto sticky top-0 z-100">
        <div className="flex-1">
            <Link href="/">
                <Image alt="logo" src={Logo} className="w-10 h-10 invert" />
            </Link>
        </div>
        <div className="flex-none">
            <Link href="/blog" className="hover:underline">Blog</Link>
        </div>
    </div>
}
