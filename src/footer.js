import injected_footer from "./injected_footer.html?raw"

/** 
 * This function injects the content of the footer, it uses `innerHTML` as
 * it's considered secure in this context. 
 * */
export function footer_body_injection() {
    const footer = document.getElementById("footer");
    const footer_container = document.createElement("div");

    footer_container.innerHTML = injected_footer;

    footer.appendChild(footer_container);
 }
