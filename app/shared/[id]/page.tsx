import { retrieveFileByRef } from "@/scripts/fb_utils/file_mgr";
import { Metadata } from "next";
import { BsDownload } from "react-icons/bs";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Shared file – JWS Drive",
    icons: {
        icon: "/assets/logo.svg"
    }
}

async function Dialog(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const fileData = await retrieveFileByRef(params.id);

    if (!fileData)
        return <p>File not found :(</p>;

    return <>
        <div className="flex justify-between">
            <h1 className="card-title">
                {fileData.filename}
            </h1>
            <a
                className="btn hover:btn-primary btn-outline btn-sm"
                href={fileData.downloadUrl}
                target="_blank"
            >
                <BsDownload /> Download
            </a>
        </div>
        <p className="opacity-80">{fileData.description}</p>
        <p className="opacity-60">
            You can download this file now or come back later.
        </p>
    </>
}

export default function Page(props: { params: Promise<{ id: string }> }) {
    return <div className="w-full h-dvh flex justify-center items-center">
        <div className="card max-w-[700px]">
            <div className="card-body space-y-4">
                <Suspense fallback={
                    <span className="loading loading-spinner" />
                }>
                    <Dialog params={props.params} />
                </Suspense>
            </div>
        </div>
    </div>
}
