import { createSignal } from "solid-js";

/** context of the whole website, every data is stored here
 * for better context access
 */
export namespace GlobalContext {
    /** is the welcome screen still into view or not */
    export const [welcomeInView, updateWelcomeViewState] = createSignal(false);
    /** is the bars visible or not */
    export const [barVisible, updateBarVisibility] = createSignal(true);
    /** does user select is enabled or not */
    export const [userSelectEnabled, enableUserSelect] = createSignal(true);
}