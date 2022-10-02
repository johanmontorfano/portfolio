import { createEffect } from 'solid-js';
import { realtime } from './../scripts/firebase-init';
import { ref, onValue, onChildChanged } from "firebase/database";
import { createSignal } from 'solid-js';
import { cached } from '../contexts/cached';

/** Determines if the client is online or not */
export function useNetworkPresence() {
    const [online, setOnline] = createSignal(false);
    
    createEffect(() => {
        setOnline(cached.projects.length > 0)
    }, cached.projects)

    return online;
}