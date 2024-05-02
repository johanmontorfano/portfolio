/** Manages color scheme changes through the app by providing callbacks and 
* removing unecessary code from important parts of the app in an effort of 
* refactoring code. */
export function useThemeLifecycle() {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const callbacks: ((is_dark: boolean) => void)[] = [];
    let is_dark = query.matches;

    query.addEventListener("change", ev => { 
        is_dark = ev.matches;
        callbacks.forEach(cb => cb(is_dark));
    });
    return { 
        is_dark, 
        onThemeChange: (cb: (is_dark: boolean) => void) => {
            callbacks.push(cb);
            cb(is_dark);
        }
    };
}
