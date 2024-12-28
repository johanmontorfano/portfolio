import { createSignal } from "solid-js";
import { Project } from "./project";

export function useProjectsLoader() {
    const [loaded, setLoaded] = createSignal(false);
    const [error, setError] = createSignal<string | null>(null);
    const [data, setData] = createSignal<Project[]>([]);

    setTimeout(() => fetch("/data/projects.json").then(async res => {
        if (res.ok) setData(await res.json() as Project[]);
        else setError(res.statusText);
    }).catch(err => {
        setError(err);
    }).finally(() => setLoaded(true)), 1000);

    return [loaded, data, error] as const;
}
