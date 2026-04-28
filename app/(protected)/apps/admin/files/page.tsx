import { FileModalSummoner } from "@/components/files_mgr/create";
import { ListExtendedFiles } from "@/components/files_mgr/list";
import { retrieveAllFiles } from "@/scripts/fb_utils/file_mgr"

export default async function Page() {
    const files = await retrieveAllFiles();

    return <div className="pt-20">
        <h1 className="text-5xl font-bold">File Manager</h1>
        <p>The file manager is used to share files using JWS</p>
        <br />
        <div className="py-4 flex justify-end">
            <FileModalSummoner />
        </div>
        <ListExtendedFiles files={files} />
    </div>
}
