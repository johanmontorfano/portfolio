import Logo from "@/public/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";

export function TopBar() {
    return <div className="sticky top-0 flex justify-between items-center max-w-[700px] mx-auto w-[90%]">
        <Image alt="logo" src={Logo} className="invert w-10 h-10" />
        <div className="flex gap-2">
            <Link href="/apps/admin/files">Files</Link>
            <Link href="/apps/admin/tinyurl">TinyURL</Link>
        </div>
        <div />
    </div>
}
