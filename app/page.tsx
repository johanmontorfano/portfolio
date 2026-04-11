"use client";

import { Overlay } from "@/components/player/overlay";
import { DynamicSceneLoader } from "@/components/scenes/loader";

export default function Page() {
    return <main className="relative">
        <div id="player" className="relative h-[100dvh]">
            <DynamicSceneLoader />
        </div>
        <div className="absolute inset-8 pointer-events-none">
            <Overlay />
        </div>
    </main>
}
