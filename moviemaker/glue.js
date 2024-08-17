/// Scrolled distance.
let vsd = 0;
/// Scrolling callbacks.
const cbs = [];

/// Set a property to an item.
export const st = (el, prop, val) => el.style.setProperty(prop, val);
/// Push an item into another item using a selector.
export const ps = (el, sl) => document.querySelectorAll(sl)[0].appendChild(el);
/// Add a parallaxed item.
export const plx = (el, from_s, to_s, unit, s_prop, from_vsd, to_vsd) => {
    cbs.push(() => {
        const progression = (vsd - from_vsd) / to_vsd;
        const s_prog = from_s + progression * to_s + unit;

        st(el, s_prop, s_prog);
    });
};

window.addEventListener("wheel", ev => {
    vsd += ev.deltaY;
    cbs.forEach(c => c());
});
