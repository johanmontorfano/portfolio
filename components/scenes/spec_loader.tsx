import { lazy, ReactNode, Suspense } from "react";

// PERF: we will be opting to a modular loader system where a module entry is
// composed of <loader>/<name>. the loader gets the name and it is up to its
// discrecy to return the appropriate DOM elements depending on the name
// NOTE: available loaders are:
// - url -> redirects to a specific URL
// - jsx -> loads a JSX scene module
// - none -> does nothing except loading metadata
// - video -> loads a video from a public path

// Loads a scene from a module with no extra UI for inline integration
export async function DynModuleLoader(props: {
    module: string;
    whileLoading?: ReactNode;
}) {
    const bsl = props.module.indexOf("/");
    const [loader, name] = [
        props.module.slice(0, bsl),
        props.module.slice(bsl + 1)
    ];

    if (loader !== "jsx")
        throw new Error("DynModuleLoader only supports jsx modules");
    const GettedModule = lazy(() => import(
        `@/components/scenes/by_module/${name}.tsx`
    ));
    
    return <Suspense fallback={props.whileLoading || "loading"}>
        <GettedModule />
    </Suspense>
}
