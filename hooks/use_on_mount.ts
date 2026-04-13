import { useEffect } from "react";

// passed function is called only when the component's mounted
//
// NOTE: really useful for initial ASCII declaration
export function useOnMount(fn: () => any) {
    useEffect(() => {
        if (typeof window !== undefined)
            return fn();
    }, []);
}
