import "./orbs.scss";

export function Orbs() {
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move(item: HTMLElement) {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        item.style.transform = 
            `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
        requestAnimationFrame(() => {
            move(item);
        });
    }

    window.addEventListener('mousemove', (event) => {
        tgX = event.clientX;
        tgY = event.clientY;
    });

    return <div class="gradient-bg">
        <div class="gradients-container">
                <div class="g1" />
                <div class="g2" />
                <div class="g3" />
                <div class="g4" />
                <div class="g5" />
            <div class="interactive" ref={move} />
        </div>
    </div>
}
