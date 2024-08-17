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

const orb1 = document.createElement('div');
const orb2 = document.createElement('div');
const orb3 = document.createElement('div');
st(orb1, 'width', '50vw');
st(orb2, 'width', '50vw');
st(orb3, 'width', '50vw');
st(orb1, 'height', '50vw');
st(orb2, 'height', '50vw');
st(orb3, 'height', '50vw');
st(orb1, 'background', '#FFFF00');
st(orb2, 'background', '#FFFF00');
st(orb3, 'background', '#FFFF00');
st(orb1, 'border-radius', '50rem');
st(orb2, 'border-radius', '50rem');
st(orb3, 'border-radius', '50rem');
ps(orb1, 'html>body');
ps(orb2, 'html>body');
ps(orb3, 'html>body');