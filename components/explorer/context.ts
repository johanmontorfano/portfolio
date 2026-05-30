import { create } from "zustand";

export const useExplorerContext = create<{
    open: boolean;
    object: Record<string, any> | null;
    onRequireSave: (() => void) | null;
    setOpen(open: boolean): void;
    setObject(object: Record<string, any>): void;
    setOnRequireSave(onRequireSave: () => void): void;
}>((update) => ({
    open: false,
    object: null,
    onRequireSave: null,
    setOpen(open) {
        update({ open });
    },
    setObject(object) {
        update({ object });
    },
    setOnRequireSave(onRequireSave) {
        update({ onRequireSave });
    },
}));
