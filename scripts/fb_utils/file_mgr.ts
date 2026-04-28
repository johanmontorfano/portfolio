import "server-only";
import { firestore, storage } from "../firebase/server";
import { ExportedFile, ExtendedFile, File } from "./types/file_mgr";
import { getUser } from "./server_auth";
import { v4 } from "uuid";

// "exports" a file (transforms File -> ExportedFile)
// NOTE: this returns an extended file, fields must be hidden when returning a
// file to a non-admin
export async function exportFile(from: File): Promise<ExtendedFile> {
    const downloadUrl = await storage.bucket().file(from.storagePath)
        .getSignedUrl({
            action: "read",
            expires: 60 * 10 * 1000 + Date.now()
        });

    return {
        ...from,
        downloadUrl: downloadUrl[0],
        shareableLink: "https://johanmontorfano.com/shared/" + from.id,
        filename: from.storagePath.split("/").reverse()[0]
    }
}

// WARN: this function must be called in authed admin envs
export async function retrieveAllFiles(): Promise<ExtendedFile[]> {
    const user = await getUser();

    // NOTE: we don't return any files if there is no logged in user
    // TODO: improve with a permission system
    if (user === null)
        return [];

    const snap = await firestore.collection("file_mgr_shared").get();
    const out: Awaited<ReturnType<typeof retrieveAllFiles>> = [];

    await Promise.all(snap.docs.map(
        async doc => out.push(await exportFile(doc.data() as File))
    ));
    return out;
}

// NOTE: this function will return data about a file depending on the auth
// state of the user
export async function retrieveFileByRef(
    id: string
): Promise<ExportedFile | ExtendedFile | null> {
    const user = await getUser();
    const snap = await firestore.collection("file_mgr_shared").doc(id).get();
    
    if (!snap.exists)
       return null;

    const data = await exportFile(snap.data() as File);

    if (user !== null)
        return data;
    return {
        id: data.id,
        description: data.description,
        downloadUrl: data.downloadUrl,
        shareableLink: data.shareableLink
    } satisfies ExportedFile;
}

// WARN: this function must be calledin authed admin envs
export async function createFileAndGetUploadURL(
    filename: string,
    description: string,
    identityBound: boolean,
    boundToEmails: string[]
): Promise<string | null> {
    const user = await getUser();

    if (user === null)
        return null;

    const id = v4();
    const bucketStoragePath = `file_mgr_shared/${id}/${filename}`;

    await firestore.collection("file_mgr_shared").doc(id).set({
        id, description,
        isUsingIdentityBoundSharing: identityBound,
        sharedWithEmails: boundToEmails,
        storagePath: bucketStoragePath,
    } satisfies File);
    return (await storage.bucket().file(bucketStoragePath)
        .getSignedUrl({
            action: "write",
            expires: 60 * 30 * 1000 + Date.now(),
            contentType: "application/octet-stream",
        }))[0];
}
