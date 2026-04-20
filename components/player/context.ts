import { create } from "zustand";
import { IconType } from "react-icons";
import { BsLinkedin, BsGithub } from "react-icons/bs";

// When the chapter's "disableIntro" property is set to true, all scenes
// loaders are instructed to execute the scene directly with no interface
// in-between
// 
// When the chapter's "enableBackNavigation" property is set to true, all
// scenes loaders are instructed to use necessary UI/UX methods to allow the
// previous chapter to remain reachable through a "go-back" or "never leave"
// UX.
//
// When the chapter's "disableRerender" property is set to true, the state will
// be updated but scenes loaders are incenticized to NOT consider this update
// and keep a dirty state. This is usually used with automatic going backs with
// navigation modules loaders.
//
// NOTE: the module field corresponds to the unique module identifier of the
// Chapter. it is important to note that modules starting with video/ will be
// considered as public paths to a video while other modules must only be a
// name as module resolving will be performed on its own by the scene loader
// from the components/scenes/by_module/<name> which must export a Scene
// component
// PERF: we will be opting to a modular loader system where a module entry is
// composed of <loader>/<name>. the loader gets the name and it is up to its
// discrecy to return the appropriate DOM elements depending on the name
// HACK: a chapter whose module name is "" will be considered as not available
export interface Chapter {
    title: string;
    module: string;
    
    disableIntro?: boolean;
    disableRerender?: boolean;
    enableBackNavigation?: boolean;
}

export interface Social {
    icon: IconType;
    target: string;
    title: string;
}

export interface PlayerContext {
    paused: boolean;
    chapter: Chapter;
    previousChapter?: Chapter;
}

// by chapters we mean all footages that are meant to be played
export const PlayerChapters: Chapter[] = [
    { title: "MACUE", module: "none/macue" }, // MACUE + remote ctrl + footages + experimentation data
    { title: "Decentralization", module: "jsx/p2p" }, // jmp2p, ..
    { title: "Hardened Metadata Binding", module: "none/aead" }, // sealing
    { title: "Johan's Dumb OS", module: "none/jdos" }, // OS + bootloader
    { title: "Private Infrastructure", module: "none/infra" }, // arm, gitea, pod...
    { title: "Other Projects", module: "jsx/misc" } // anything like ascii...
];

export const Socials: Social[] = [
    { title: "LinkedIn", target: "linkedin.com/in/jhnm", icon: BsLinkedin },
    { title: "Github", target: "github.com/johanmontorfano", icon: BsGithub }
];

export const usePlayer = create<PlayerContext & {
    togglePause(): void;
    setChapter(state: Chapter): void;
    goBack(): Chapter | undefined;
}>((set) => ({
    paused: true,
    chapter: PlayerChapters[0],
    togglePause() { set({ paused: !usePlayer.getState().paused }); },
    setChapter(state) {
        set((prev) => ({
            chapter: state,
            previousChapter: prev.chapter
        }));
    },
    goBack() {
        let out: Chapter | undefined;

        set((prev) => {
            if (prev.previousChapter === undefined) {
                out = prev.chapter;
                return {};
            } else {
                out = prev.previousChapter;
                return {
                    chapter: prev.previousChapter,
                    previousChapter: undefined
                }
            }
        });
        return out;
    },
}));
