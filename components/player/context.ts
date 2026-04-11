import { create } from "zustand";
import { IconType } from "react-icons";
import { BsLinkedin, BsGithub } from "react-icons/bs";

// NOTE: the module field corresponds to the unique module identifier of the
// Chapter. it is important to note that modules starting with video/ will be
// considered as public paths to a video while other modules must only be a
// name as module resolving will be performed on its own by the scene loader
// from the components/scenes/by_module/<name> which must export a Scene
// component
// FIX: we will be opting to a modular loader system where a module entry is
// composed of <loader>/<name>. the loader gets the name and it is up to its
// discrecy to return the appropriate DOM elements depending on the name
// HACK: a chapter whose module name is "" will be considered as not available
export interface Chapter {
    title: string;
    module: string;
}

export interface Social {
    icon: IconType;
    target: string;
    title: string;
}

export interface PlayerContext {
    paused: boolean;
    chapter: Chapter;
}

// by chapters we mean all footages that are meant to be played
export const PlayerChapters: Chapter[] = [
    { title: "Robotic Arm", module: "none/robot" }, // footages, infra for remote ctrl
    { title: "MACUE", module: "none/macue" }, // footages + experimentation data
    { title: "Hardened Metadata Binding", module: "none/aead" }, // sealing
    { title: "Sovereign Identity", module: "none/datalis" }, // indiv owship of data
    { title: "Johan's Dumb OS", module: "none/jdos" }, // OS + bootloader => ll intrst
    { title: "Decentralized Development", module: "none/p2p" }, // jmp2p, ..
    { title: "Private Infrastructure", module: "none/infra" }, // arm, gitea, pod...
    { title: "Other Projects", module: "none/misc" } // anything like ascii engine ...
];

export const Socials: Social[] = [
    { title: "LinkedIn", target: "linkedin.com/in/jhnm", icon: BsLinkedin },
    { title: "Github", target: "github.com/johanmontorfano", icon: BsGithub }
];

export const usePlayer = create<PlayerContext & {
    togglePause(): void;
    setChapter(state: Chapter): void;
}>((set) => ({
    paused: true,
    chapter: PlayerChapters[0],
    togglePause() { set({ paused: !usePlayer.getState().paused }); },
    setChapter(state) { set({ chapter: state }); }
}));
