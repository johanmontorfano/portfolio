let vsd = 0;
const cbs = [];

export const st = (el, prop, val) => el.style.setProperty(prop, val);
export const ps = (el, sl) => document.querySelectorAll(sl)[0].appendChild(el);
/// Add a parallaxed item.
export const plx = (el, from_s, to_s, unit, s_prop, from_vsd, to_vsd) => {
    el.style.setProperty("transition", "none");
    cbs.push(() => {
        const diff = to_s - from_s;
        const p = (vsd - from_vsd) / to_vsd;
        const v_a = from_s > to_s ? from_s : to_s;
        const v_b = from_s > to_s ? to_s : from_s;
        const s_p = Math.max(v_b, Math.min(v_a, from_s + p * diff)) + unit;

        st(el, s_prop, s_p);
    });
};
export const wait = (ms) => new Promise((res) => setTimeout(res, ms));
export const stp = (el, prop, val) => el.setAttribute(prop, val);
export const text = (el, text) => el.textContent = text;

window.addEventListener("wheel", ev => {
    vsd += ev.deltaY;
    cbs.forEach(c => c());
});
