let vsd = 0;
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
    let is_after = vsd => after;
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

window.addEventListener("wheel", ev => {
    vsd += ev.deltaY > 0 ? Math.min(20, ev.deltaY) : Math.max(-20, ev.deltaY);
    cbs.forEach(c => c());
});
