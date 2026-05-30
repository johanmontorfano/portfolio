import { FileModalSummoner } from "@/components/files_mgr/create";
import { retrieveAllFiles } from "@/scripts/fb_utils/file_mgr"
import Link from "next/link";
import { BsDownload, BsGlobe2, BsLink, BsShieldCheck } from "react-icons/bs";

export default async function Page() {
    const files = await retrieveAllFiles();

    return <div>
        <header className="pt-48">
            <h1 className="text-4xl font-bold">File Manager</h1>
            <p>The file manager is used to share files using JWS</p>
        </header>
        <br />
        <main>
            <div className="py-4 flex justify-end">
                <FileModalSummoner />
            </div>
            <div className="overflow-x-auto border border-base-200 rounded-lg shadow-sm">
            <table className="table table-zebra w-full">
                <thead>
                    <tr className="bg-base-200/50">
                        <th>File Info</th>
                        <th>Storage Path</th>
                        <th>Access Control</th>
                        <th className="text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {files.map((file) => (
                        <tr key={file.id} className="hover">
                            <td>
                                <div className="flex flex-col">
                                    <span className="font-bold">
                                        {file.filename}
                                    </span>
                                    <span className="text-xs opacity-60 truncate max-w-[200px]">
                                        {file.description}
                                    </span>
                                    <span className="text-[10px] font-mono opacity-40 uppercase mt-1">
                                        ID: {file.id}
                                    </span>
                                </div>
                            </td>
                            <td>
                                <code className="text-xs bg-base-300 px-2 py-1 rounded-md">
                                    {file.storagePath}
                                </code>
                            </td>
                            <td>
                                {file.isUsingIdentityBoundSharing ? (
                                    <div className="flex flex-col gap-1">
                                        <div className="badge badge-warning badge-sm gap-1 py-3 px-3">
                                            <BsShieldCheck className="w-3 h-3" />
                                            Identity Bound
                                        </div>
                                        <div className="text-[10px] opacity-50 italic px-1">
                                            {file.sharedWithEmails?.join(
                                                ", ",
                                            ) || "No emails specified"}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="badge badge-info badge-sm gap-1 py-3 px-3 text-white">
                                        <BsGlobe2 className="w-3 h-3" />
                                        Public/Shared
                                    </div>
                                )}
                            </td>
                            <td className="text-right">
                                <div className="flex justify-end gap-2">
                                    <Link
                                        href={file.shareableLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-ghost btn-square btn-sm border-base-300"
                                        title="Copy Shareable Link"
                                    >
                                        <BsLink className="w-5 h-5" />
                                    </Link>
                                    <Link
                                        href={file.downloadUrl}
                                        className="btn btn-primary btn-sm gap-2"
                                    >
                                        <BsDownload className="w-3.5 h-3.5" />
                                        Download
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        </main>
    </div>
}
