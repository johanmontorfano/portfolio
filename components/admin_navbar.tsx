import { BsPersonX } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";

import Logo from "@/public/assets/logo.svg";

export function Navbar({
    links = [
        ["/apps/admin/files", "Files"],
        ["/apps/admin/blog", "Blog"]
    ]
}: { links?: [string, string][] }) {
    return <div className="navbar max-w-[800px] w-[90%] mx-auto sticky top-0 z-100">
        <div className="flex-1">
            <Link href="/">
                <Image alt="logo" src={Logo} className="w-10 h-10" />
            </Link>
        </div>
        <div className="flex gap-2">
            {links.map(d =>  
                <Link
                    key={`admin-nav-${d[0]}`}
                    href={d[0]}
                    className="hover:underline"
                >{d[1]}</Link>
            )}
        </div>
        <div className="flex-1 flex justify-end">
            <Link href="/auth/logout" prefetch={false} className="btn btn-error btn-ghost btn-sm">
                <BsPersonX size={18} />
            </Link>
        </div>
    </div>
}
