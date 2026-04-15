import { createLink } from "@/components/map/links";
import { DottedMap } from "@/components/map/map";
import MapData from "@/public/maps/dot_map.json";

// this map debug page is used to gather RC coordinates of specific points
export default function Page() {
    return <div className="max-w-full">
        <DottedMap
            data={MapData}
            rcNodes={[
                { r: 62, c: 49 },
                { r: 62, c: 24 },
                { r: 60, c: 80 },
                { r: 72, c: 135 },
                { r: 96, c: 62 },
                { r: 97, c: 135 }
            ]}
            links={[
                createLink(2, 1),
                createLink(1, 3),
                createLink(4, 5, { curve: 50, spawnAt: 1000 }),
                createLink(5, 6, { curve: 50, spawnAt: 1250 }),
                createLink(3, 5, { spawnAt: 1500 })
            ]}
            disableMutate
        />
    </div>
}
