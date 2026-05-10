import { DottedMap } from "@/components/map/map";
import { createLink } from "@/components/map/links";
import { rand, rsizeget } from "@/components/map/math";

import MapData from "@/public/maps/europe_map.json";
import data from "@/public/data/p2p.json";

// this map debug page is used to gather RC coordinates of specific points
export default function Page() {
    return <div className="max-w-full max-w-[800px]">
        <DottedMap
            data={MapData}
            className="max-w-[1500px]"
            disableMutate
            rcNodes={[
                ...data.map_data.points.centers,
                ...data.map_data.points.peers
            ].map(p => ({ r : p[0], c: p[1] }))}
            links={[
                ...new Set([
                    ...data.map_data.points.centers,
                    ...data.map_data.points.peers
                ].map((_, x) => {
                    const conn = Math.ceil(rand(2));
                    const out: Array<[number, number]> = [];

                    for (let i = 0; i <= conn; i++) {
                        const direction = rand();
                        const remote = Math.max(1,
                            rsizeget(1, data.map_data.points.peers.length)[0]
                        );

                        if (direction < 0.5) out.push([x + 1, remote]);
                        else out.push([remote, x + 1]);
                    }
                    return out;
                }).flat())
            ].map((l, i) => createLink(l[0], l[1], {
                spawnAt: i * 250,
                curve: 0.2
            }))}
            debugOnClickGetRC
            debugExposeController
        />
    </div>
}
