let vsd = 0;
let touchPoints = [];
const cbs = [];

/// Calculate a value out of a given progression in the transition from a value
// a to a value b
const tvc = (from, to, p) => {
    const diff = to - from;
    const v_a = from > to ? from : to;
    const v_b = from > to ? to : from;
    
    return Math.max(v_b, Math.min(v_a, from + p * diff));
}
const hexa_to_rgba = (hex) => {
    return [
        parseInt(hex.slice(1, 3), 16),
        parseInt(hex.slice(3, 5), 16),
        parseInt(hex.slice(5, 7), 16),
        parseInt(hex.slice(7, 9), 16)
    ];
}
const rgba_to_hexa = (rgb) => {
    const c = (a) => {
        let hex = a.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${c(rgb[0])}${c(rgb[1])}${c(rgb[2])}${c(rgb[3])}`;
}
const tvchexa = (from, to, p) => {
    const from_rgb = hexa_to_rgba(from);
    const to_rgb = hexa_to_rgba(to);
    const out = from_rgb.map((v, i) => parseInt(tvc(v, to_rgb[i], p)));

    return rgba_to_hexa(out);
}

export const st = (el, prop, val) => el.style.setProperty(prop, val);
export const ps = (el, sl) => document.querySelectorAll(sl)[0].appendChild(el);
/// Add a parallaxed item.
export const plx = (el, from_s, to_s, unit, s_prop, from_vsd, to_vsd) => {
    el.style.setProperty("transition", "none");
    cbs.push(() => {
        const p = (vsd - from_vsd) / to_vsd;

        if (unit === "->hex") st(el, s_prop, tvchexa(from_s, to_s, p));
        else st(el, s_prop, tvc(from_s, to_s, p) + unit);
    });
};
export const styplxbefore = (el, prop, val, before) => {
    let is_after = vsd >= before;
    cbs.push(() => {
        if (vsd < before && is_after) {
            is_after = false;
            st(el, prop, val);
        } else if (vsd >= before) is_after = true;
    });
}
export const styplxafter = (el, prop, val, after) => {
    let is_after = vsd >= after;
    cbs.push(() => {
        if (vsd >= after && !is_after) {
            is_after = true;
            st(el, prop, val);
        } else if (vsd < after) is_after = false;
    });
}
export const wait = (ms) => new Promise((res) => setTimeout(res, ms));
export const stp = (el, prop, val) => el.setAttribute(prop, val);
export const text = (el, text) => el.textContent = text;

function calculateDistance(points) {
    let totalDistance = 0;

    for (let i = 1; i < points.length; i++) {
        const {clientY: y1} = points[i - 1];
        const {clientY: y2} = points[i];

        totalDistance += y2 - y1 * -1;
    }

    return totalDistance;
}

document.body.addEventListener("touchstart", (event) => {
    touchPoints = [event.touches[0]];
});
document.body.addEventListener("touchmove", (event) => {
    touchPoints.push(event.touches[0]);
    const delta = calculateDistance(touchPoints);
    vsd += delta > 0 ? Math.min(20, delta) : Math.max(-20, delta);
    touchPoints = [event.touches[0]];
    cbs.forEach(c => c());
});
window.addEventListener("wheel", ev => {
    vsd += ev.deltaY > 0 ? Math.min(20, ev.deltaY) : Math.max(-20, ev.deltaY);
    cbs.forEach(c => c());
});

import {footer_body_injection} from "./footer.js"
const orb1 = document.createElement('div');
const orb2 = document.createElement('div');
const orb3 = document.createElement('div');
const text_firstname = document.createElement('h1');
const text_lastname = document.createElement('h1');
const blur_layer = document.createElement('div');
const body = document.querySelectorAll('body')[0]
text(text_firstname, "JOHAN")
text(text_lastname, "MONTORFANO")
st(text_firstname, 'z-index', '2');
st(text_lastname, 'z-index', '2');
st(blur_layer, 'width', '100%');
st(blur_layer, 'height', '100dvh');
st(blur_layer, 'background', '#FFFFFFA0');
st(blur_layer, 'backdrop-filter', 'blur(50px)');
st(text_firstname, 'top', '50%');
st(text_lastname, 'top', '50%');
st(text_firstname, 'opacity', '0.3');
st(text_lastname, 'opacity', '0.3');
st(text_firstname, 'transition', 'all 1s ease');
st(text_lastname, 'transition', 'all 1s ease');
st(text_firstname, 'left', '13%');
st(text_firstname, 'transform', 'translateX(-110%) translateY(-50%)');
st(text_lastname, 'left', '75%');
st(text_lastname, 'transform', 'translateX(0%) translateY(-50%)');
st(orb1, 'position', 'absolute');
st(orb2, 'position', 'absolute');
st(orb3, 'position', 'absolute');
st(orb1, 'top', '50%');
st(orb2, 'top', '50%');
st(orb3, 'top', '50%');
st(orb1, 'left', '50%');
st(orb2, 'left', '50%');
st(orb3, 'left', '50%');
st(orb1, 'transform', 'translateX(-50%) translateY(-50%)');
st(orb2, 'transform', 'translateX(-50%) translateY(-50%)');
st(orb3, 'transform', 'translateX(-50%) translateY(-50%)');
st(orb1, 'width', '40vw');
st(orb2, 'width', '35vw');
st(orb3, 'width', '25vw');
st(orb1, 'height', '40vw');
st(orb2, 'height', '35vw');
st(orb3, 'height', '25vw');
st(orb1, 'background', '#00FF00');
st(orb2, 'background', '#00B400');
st(orb3, 'background', '#007A00');
st(orb1, 'border-radius', '50rem');
st(orb2, 'border-radius', '50rem');
st(orb3, 'border-radius', '50rem');
st(orb1, 'transition', 'all 1s ease');
st(orb2, 'transition', 'all 1s ease');
st(orb3, 'transition', 'all 1s ease');
st(orb1, 'top', '40%');
st(orb2, 'top', '60%');
st(orb2, 'left', '45%');
st(orb3, 'top', '55%');
st(orb3, 'left', '65%');
ps(orb1, 'html>body>#app')
ps(orb2, 'html>body>#app')
ps(orb3, 'html>body>#app')
ps(blur_layer, 'html>body>#app')
ps(text_firstname, 'html>body>#app')
ps(text_lastname, 'html>body>#app')
await wait(1000);
st(text_firstname, 'left', '50%');
st(text_lastname, 'left', '50%');
st(text_firstname, 'opacity', '1');
st(text_lastname, 'opacity', '1');
st(orb1, 'width', '30vw');
st(orb2, 'width', '25vw');
st(orb3, 'width', '15vw');
st(orb1, 'height', '30vw');
st(orb2, 'height', '25vw');
st(orb3, 'height', '15vw');
const text_greeting = document.createElement('h1');
const text_catchphrase = document.createElement('p');
const greet_container = document.createElement('div');
stp(greet_container, 'id', "text_greeting")
text(text_greeting, "Hi, I'm Johan")
text(text_catchphrase, "I can do (almost) anything you want")
st(text_catchphrase, 'font-family', 'Playfair Display');
st(text_catchphrase, 'opacity', '0.8');
st(text_catchphrase, 'font-size', 'clamp(35px, 6vw, 45p)');
st(greet_container, 'position', 'absolute');
st(greet_container, 'top', '3rem');
st(greet_container, 'left', '10%');
st(greet_container, 'opacity', '0');
st(greet_container, 'transition', 'all 1s ease');
ps(greet_container, 'html>body>#app')
ps(text_greeting, 'div#text_greeting')
ps(text_catchphrase, 'div#text_greeting')
const footer = document.createElement('div');
const footer_top = document.createElement('div');
const link_container = document.createElement('div');
const logo = document.createElement('img');
const github_link = document.createElement('a');
const mail_link = document.createElement('a');
const github_container = document.createElement('div');
const github_logo = document.createElement('img');
const github_text = document.createElement('p');
const projlist = document.createElement('div');
stp(projlist, 'id', "projlist")
stp(github_container, 'id', "github_container")
stp(footer, 'id', "footer")
stp(footer_top, 'id', "footer_top")
stp(link_container, 'id', "f__link_container")
text(github_link, "Check out my GitHub account")
text(mail_link, "Contact me via email")
stp(github_link, 'href', "https://www.github.com/johanmontorfano")
stp(mail_link, 'href', "mailto:me@johanmontorfano.com")
stp(logo, 'src', "/assets/logo.svg")
stp(logo, 'width', 50)
stp(logo, 'height', 50)
st(logo, 'padding-left', '30px');
st(logo, 'padding-right', '30px');
st(link_container, 'position', 'absolute');
st(link_container, 'left', '50%');
st(link_container, 'transform', 'translateX(-50%)');
st(link_container, 'display', 'flex');
st(link_container, 'align-items', 'center');
st(link_container, 'gap', '20px');
st(footer, 'position', 'absolute');
st(footer, 'bottom', '-80px');
st(footer, 'width', '100vw');
st(footer, 'height', '50px');
st(footer, 'background', '#FFFFFF99');
st(footer, 'backdrop-filter', 'blur(50px)');
st(footer, 'border-top', '1px solid #AAAAAA');
st(footer, 'opacity', '0');
st(footer, 'display', 'flex');
st(footer, 'flex-direction', 'column');
st(footer, 'transition', 'all 1s ease');
st(footer, 'z-index', '10');
st(footer, 'overflow', 'hidden');
st(footer_top, 'display', 'flex');
st(footer_top, 'align-items', 'center');
st(footer_top, 'width', '100vw');
st(footer_top, 'height', '70px');
st(projlist, 'display', 'flex');
st(projlist, 'height', '100dvh');
st(projlist, 'column-gap', '10dvw');
st(projlist, 'box-sizing', 'content-box');
st(projlist, '--left', '10%');
st(projlist, 'transform', 'translateX(var(--left))');
st(projlist, 'opacity', '0');
st(projlist, 'transition', 'all 1s ease');
ps(footer, 'html>body>#app')
ps(projlist, 'html>body>#app')
ps(footer_top, 'div#footer')
ps(logo, 'div#footer_top')
ps(link_container, 'div#footer_top')
ps(github_link, 'div#f__link_container')
ps(mail_link, 'div#f__link_container')
let projects = await(await fetch('/static/projects.json')).json();
projects.forEach((item, index) => {
const projcontainer = document.createElement('div');
const projtitle = document.createElement('h2');
st(projcontainer, 'width', '79.6dvh');
st(projcontainer, 'height', '45dvh');
st(projcontainer, 'white-space', 'nowrap');
st(projcontainer, 'background-image', 'url('+item.img_url+')');
st(projcontainer, 'background-position', 'center center');
st(projcontainer, 'background-repeat', 'no-repeat');
st(projcontainer, 'background-size', 'contain');
st(projcontainer, 'transform', 'translateY(50%)');
st(projcontainer, 'border-radius', '20px');
st(projcontainer, 'cursor', 'pointer');
st(projtitle, 'position', 'absolute');
st(projtitle, 'width', 'calc(100% - 50px)');
st(projtitle, 'padding', '25px');
st(projtitle, 'bottom', '0');
st(projtitle, 'color', 'white');
st(projtitle, 'mix-blend-mode', 'difference');
st(projtitle, 'overflow', 'hidden');
st(projtitle, 'font-family', 'Roboto');
stp(projcontainer, 'id', "proj" + index)
text(projtitle, item.name)
projcontainer.addEventListener("mouseenter", () => {
st(projcontainer, 'transition', 'all 0.2s ease');
st(projcontainer, 'transform', 'translateY(50%) scale(1.1)');
})
projcontainer.addEventListener("mouseleave", () => {
st(projcontainer, 'transition', 'all 0.2s ease');
st(projcontainer, 'transform', 'translateY(50%) scale(1)');
})
projcontainer.addEventListener("click", () => {
    window.location.assign(item.project_url)
})
ps(projcontainer, '#projlist')
ps(projtitle, "#" + "proj" + index)
});
await wait(1000);
st(orb1, 'top', '0%');
st(orb1, 'left', '85%');
st(orb1, 'width', '50vw');
st(orb1, 'height', '60vh');
st(orb2, 'top', '50%');
st(orb2, 'left', '85%');
st(orb2, 'height', '45vh');
st(orb2, 'width', '35vw');
st(orb3, 'top', '85%');
st(orb3, 'left', '85%');
st(orb3, 'width', '40vw');
st(orb3, 'height', '45vh');
st(orb1, 'opacity', '0');
st(orb2, 'opacity', '0');
st(orb3, 'opacity', '0');
st(projlist, '--left', '2.5%');
st(projlist, 'opacity', '1');
st(footer, 'bottom', '0px');
st(footer, 'opacity', '1');
st(greet_container, 'left', '5%');
st(greet_container, 'opacity', '1');
st(text_firstname, 'top', '45%');
st(text_lastname, 'top', '45%');
st(text_firstname, 'opacity', '0');
st(text_lastname, 'opacity', '0');
st(logo, '--invert', '0%');
st(logo, 'filter', 'invert(var(--invert))');
await wait(1000);
plx(greet_container, 3, -3, 'rem', 'top', 0, 150)
plx(greet_container, 100, 0, '%', 'opacity', 0, 150)
plx(body, "#DDDDDDFF", "#333333FF", '->hex', 'background', 0, 250)
plx(blur_layer, "#FFFFFFAA", "#111111AA", '->hex', 'background', 0, 250)
plx(footer, "#FFFFFFAA", "#111111AA", '->hex', 'background', 0, 250)
plx(github_link, "#393939FF", "#D3D3D3FF", '->hex', 'color', 0, 250)
plx(mail_link, "#393939FF", "#D3D3D3FF", '->hex', 'color', 0, 250)
plx(logo, 0, 100, '%', '--invert', 0, 250)
plx(projlist, 2.5, -100, '%', '--left', 0, 1400)
footer_body_injection()
styplxbefore(footer, 'transition', 'all 0s ease', 1000);
styplxafter(footer, 'transition', 'all 1s ease', 1000);
styplxbefore(footer, 'height', '50px', 1450);
styplxafter(footer, 'height', '100dvh', 1450);