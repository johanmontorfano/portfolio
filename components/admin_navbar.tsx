"use client";

import Image from "next/image";
import Link from "next/link";
import { BsList, BsPersonX, BsChevronDown } from "react-icons/bs";

import Logo from "@/public/assets/logo-white.svg";

interface LinkGroup {
    groupName: string;
    // as [path, name]
    links: [string, string][];
}

const defaultLinks: LinkGroup[] = [
    {
        groupName: "Content",
        links: [
            ["/apps/admin/blog", "Blog Manager"],
            ["/apps/admin/files", "Files Manager"],
        ],
    },
    {
        groupName: "Lyondle",
        links: [
            ["/apps/lyondle/explorer", "COLOSSE"],
            ["/apps/lyondle/title", "App Title"],
        ],
    },
];

export function Navbar({ links = defaultLinks }: { links?: LinkGroup[] }) {
    return (
        <>
            <header className="sticky top-0 z-40 w-full">
                <nav className="navbar max-w-[800px] w-[90%] mx-auto px-0 justify-between">
                    <div className="flex items-center gap-2">
                        <label
                            htmlFor="nav-drawer"
                            aria-label="Open sidebar"
                            className="btn btn-square btn-ghost lg:hidden"
                        >
                            <BsList size={22} />
                        </label>
                        <Link href="/" className="flex items-center">
                            <Image
                                alt="logo"
                                src={Logo}
                                className="w-10 h-10"
                            />
                        </Link>
                    </div>
                    <div className="hidden lg:flex items-center gap-1">
                        {links.map((group) => (
                            <div
                                key={`desktop-group-${group.groupName}`}
                                className="dropdown dropdown-bottom dropdown-hover"
                            >
                                <button
                                    tabIndex={0}
                                    type="button"
                                    className="btn btn-ghost font-medium gap-1"
                                >
                                    {group.groupName}
                                    <BsChevronDown
                                        size={12}
                                        className="opacity-60"
                                    />
                                </button>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content menu bg-base-200 rounded-box z-50 w-52 p-2 shadow-lg border border-base-300"
                                >
                                    {group.links.map(([path, name]) => (
                                        <li key={`desktop-link-${path}`}>
                                            <Link href={path}>{name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center">
                        <Link
                            href="/auth/logout"
                            prefetch={false}
                            className="btn btn-error btn-ghost btn-sm"
                            aria-label="Logout"
                        >
                            <BsPersonX size={18} />
                        </Link>
                    </div>
                </nav>
            </header>
            <div className="drawer z-50">
                <input
                    id="nav-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                />

                <div className="drawer-side">
                    <label
                        htmlFor="nav-drawer"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    />
                    <aside className="menu p-4 w-72 min-h-screen bg-base-200 text-base-content flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-3 px-2 py-4 mb-4 border-b border-base-300">
                                <Image
                                    alt="logo"
                                    src={Logo}
                                    className="w-8 h-8"
                                />
                                <span className="font-bold text-lg">Menu</span>
                            </div>
                            <ul className="menu menu-md px-0 gap-3">
                                {links.map((group) => (
                                    <li key={`mobile-group-${group.groupName}`}>
                                        <span className="menu-title text-xs tracking-wider uppercase opacity-60">
                                            {group.groupName}
                                        </span>
                                        <ul className="before:bg-base-300">
                                            {group.links.map(([path, name]) => (
                                                <li key={`mobile-link-${path}`}>
                                                    <Link href={path}>
                                                        {name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="pt-4 border-t border-base-300">
                            <Link
                                href="/auth/logout"
                                prefetch={false}
                                className="btn btn-outline btn-error btn-sm w-full gap-2"
                            >
                                <BsPersonX size={18} />
                                <span>Logout</span>
                            </Link>
                        </div>
                    </aside>
                </div>
            </div>
        </>
    );
}
