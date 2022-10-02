/** Dynamically changes the icon of the page depending on the theme */
export function useDynamicIcon(blackIconPath: string, whiteIconPath: string) {
    const faviconElement = document.querySelector('link[rel="icon"]');

    /** Watch changes on media queries */
    const matches = window.matchMedia("(prefers-color-scheme: dark)");
    matches.addEventListener("change", (value) => {
        console.log("cc");
        if(value.matches) faviconElement?.setAttribute("href", blackIconPath);
        else faviconElement?.setAttribute("href", whiteIconPath);
    });

    /** Handle a change on function call */
    if(matches.matches) faviconElement?.setAttribute("href", blackIconPath);
    else faviconElement?.setAttribute("href", whiteIconPath);
}