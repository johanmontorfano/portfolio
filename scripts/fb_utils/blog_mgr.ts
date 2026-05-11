import "server-only";
import { firestore, storage } from "../firebase/server";
import { DocumentData, DocumentSnapshot, Timestamp } from "firebase-admin/firestore";

export interface BlogPostMetadata {
    title: string;
    // HACK: since the timestamp object is available server-side only, and we
    // store the createdAt value as a timestamp, we serialize it into a UNIX
    // ms date to avoid serialization issues and types multiplication with
    // client data retrieval
    createdAt: number;
    gcsExtlessName: string;
}

// NOTE: the markdown format used does not contain any special characteristic
// or keyword, it follows the markdown flavors conventions

// will retrieve a blog post data from GCS
// WARN: IDS MUST BE ALPHANUM ONLY WITH DASHES
export async function getBlogPost(id: string) {
    try {
        if (!/^[a-z0-9-_]+$/i.test(id))
            throw new Error("invalid ID format");

        const res = await storage.bucket().file(`blog_posts/${id}.md`)
            .download();
    
        return res[0].toString();
    } catch (e) {
        return null;
    }
}

function castToBlogPostMetadata(snap: DocumentSnapshot<DocumentData>) {
    const data = snap.data() as {
        title: string,
        gcsExtlessName: string,
        createdAt: Timestamp
    };

    return {
        title: data.title,
        gcsExtlessName: data.gcsExtlessName,
        createdAt: data.createdAt.seconds * 1000
    } satisfies BlogPostMetadata;
}

export async function getBlogPostMetadata(id: string) {
    const snap = await firestore.collection("blog_posts").doc(id).get();

    if (!snap.exists)
        return null;
    return castToBlogPostMetadata(snap);
}

export async function getLatestBlogPostsPaginated(from: number) {
    const len = await firestore.collection("blog_posts").count().get();
    const snap = await firestore.collection("blog_posts")
        .orderBy("createdAt", "desc")
        .offset(from)
        .limit(10)
        .get();
    const data = snap.docs.map(castToBlogPostMetadata);

    return {
        posts: data,
        from, to: from + 10,
        totalPosts: len
    }
}

export async function removeBlogPost(id: string) {
    if (!/^[a-z0-9-_]+$/i.test(id))
        return false;
    await firestore.collection("blog_posts").doc(id).delete();
    await storage.bucket().file(`blog_posts/${id}.md`).delete();
    return true;
}

export async function putBlogPost(
    id: string,
    metadata: BlogPostMetadata,
    body: string
) {
    if (!/^[a-z0-9-_]+$/i.test(id))
        return false;
    await firestore.collection("blog_posts").doc(id).set({
        ...metadata,
        createdAt: metadata.createdAt < 1 ?
            Timestamp.now() : Timestamp.fromMillis(metadata.createdAt),
        gcsExtlessName: id
    });
    await storage.bucket().file(`blog_posts/${id}.md`).save(body);
    return true;
}
