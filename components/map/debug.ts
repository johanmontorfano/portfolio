import { MouseEvent } from "react";
import { MapData } from "./types";

// this debug function enables getting RC infos for a specific point on a map
export function onClickGetRC(
    ev: MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>,
    data: MapData,
    scale: number,
    addNodeNear: (x: number, y: number, now: number) => void,
    onMapDataChanged?: (data: MapData) => void
) {
    const canvas = ev.currentTarget;
    const rect = canvas.getBoundingClientRect();

    const sx = (ev.clientX - rect.left) * (data.w / rect.width) * scale;
    const sy = (ev.clientY - rect.top) * (data.h / rect.height) * scale;

    const r = Math.round((sy - data.offY) / data.dy);
    
    if (r < 0 || r >= data.matrix.length) return;

    const isOddRow = r % 2 === 1;
    const xOffset = isOddRow ? data.dx / 2 : 0;
    const c = Math.round((sx - data.offX - xOffset) / data.dx);

    const row = data.matrix[r];
    
    console.log(r, c);

    if (c >= 0 && row && row[c]) {
        console.log(`Target Lock: Dot found at Row ${r}, Column ${c}`);
        
        const centerX = data.offX + xOffset + (c * data.dx);
        const centerY = data.offY + (r * data.dy);
       
        if (!onMapDataChanged)
            addNodeNear(centerX, centerY, performance.now());
        else
            data.matrix[r][c] = 0;
    } else {
        console.log("Whiff: Clicked in the dead space between dots.");
    }
}
