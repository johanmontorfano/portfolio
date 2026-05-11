import { FileModalSummoner } from "@/components/files_mgr/create";
import { ListExtendedFiles } from "@/components/files_mgr/list";
import { retrieveAllFiles } from "@/scripts/fb_utils/file_mgr"

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
            <ListExtendedFiles files={files} />
        </main>
    </div>
}
