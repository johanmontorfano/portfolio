"use client";

export function smoother(target: Element, speed: number, smooth: number) {
    let moving = false;
    let pos = target.scrollTop;
    const frame = target === document.body && document.documentElement
        ? document.documentElement : target;

    (target as HTMLElement).addEventListener(
        "wheel", scrolled, { passive: false }
    );

    function scrolled(e: WheelEvent) {
        e.preventDefault(); // disable default scrolling

        const delta = e.deltaY;
        pos += -delta * speed;
        pos = Math.max(
            0,
            Math.min(pos, target.scrollHeight - frame.clientHeight),
        ); // limit scrolling

        if (!moving) update();
    }

    function update() {
        moving = true;

        var delta = (pos - target.scrollTop) / smooth;

        target.scrollTop += delta;

        if (Math.abs(delta) > 0.5) requestAnimationFrame(update);
        else moving = false;
    }

    requestAnimationFrame(update);
}
