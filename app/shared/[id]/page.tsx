import { retrieveFileByRef } from "@/scripts/fb_utils/file_mgr";
import { Metadata } from "next";
import { BsDownload } from "react-icons/bs";
import Logo from "@/public/assets/logo.svg";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Shared file – JWS Drive",
    icons: "/assets/logo.svg"
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const fileData = await retrieveFileByRef(params.id);

    if (!fileData)
        return <p>File not found :(</p>;

    return <div className="w-full h-dvh flex justify-center items-center">
        <div className="card max-w-[400px]!">
            <figure>
                <Image alt="logo" src={Logo} className="invert w-16 h-16" />
            </figure>
            <div className="card-body">
                <h1 className="card-title text-2xl">
                    You have been shared {fileData.filename}
                </h1>
                <div className="bg-base-300 italic p-4 rounded-lg">
                    <p>{fileData.description}</p>
                </div>
                <p className="opacity-60 mt-2">
                    You can download this file now or come back later.
                </p>
                <div className="flex justify-end mt-2">
                    <a
                        className="btn btn-primary"
                        href={fileData.downloadUrl}
                        target="_blank"
                    >
                        <BsDownload />
                        Download
                    </a>
                </div>
            </div>
        </div>
    </div>
}
