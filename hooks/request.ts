import { Accessor, createSignal } from "solid-js";
import { cached, updateCache } from "../contexts/cached";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../scripts/firebase-init";

/**
 * Use the cache to get request data. If the cache doesn't contains the
 * result of this request, the server is queried.
 */
export function usePredefinedRequest<T extends any>(type: "projects"): Accessor<T[]> {
    const [data, updateData] = createSignal<T[]>([]);

    /** check if the data is on the cache */
    if (cached[type].length > 0) updateData(cached[type] as T[])
    else {
        getDocs(collection(firestore, type === "projects" ? "projects_data" : "")).then((docs) => {
            const extractedDocs: T[] = [];
            docs.forEach(doc => extractedDocs.push(doc.data() as T));

            updateCache(type, extractedDocs as any);
            updateData(extractedDocs);
        })
    }

    return data;
}