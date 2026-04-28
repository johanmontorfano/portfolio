import { Link } from "@/components/map/links";
import { RC } from "@/components/map/types";

type CreateNode = { rc: RC };
type CreateLink = { link: Link };
type RemoveLink = { rmlink: Link };
type ChangeColor = { accent: string };
type ForceRenderLayer = { name: "backdrop" };
type Reset = { reset: true };

type Commands = CreateNode |
    CreateLink |
    RemoveLink |
    ChangeColor |
    ForceRenderLayer |
    Reset;

const commands: Commands[] = [];

// The dotted map controller is used to trigger events on the dotted map
// without having to interfere with the map data and props. it acts as A FIFO
// queue the dotted map goes through at each render
export function useDottedMapController() {
    return {
        trigger(cmd: Commands) {
            commands.push(cmd);
        },
        readAll(fn: (cmd: Commands) => void) {
            commands.splice(0).forEach(fn);
        }
    }
}
