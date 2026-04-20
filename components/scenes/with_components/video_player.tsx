import { usePlayer } from "@/components/player/context"
import { useEffect, useRef } from "react";

export default function VideoPlayer(props: { videoURL: string }) {
    const player = usePlayer();
    const video = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (video.current) player.paused ?
            video.current.pause() : video.current.play();
    }, [player.paused]);

    return <div className="flex justify-center items-center h-dvh">
        <video ref={video}
            src={props.videoURL}
            className="rounded-2xl"
            controls
            muted
            autoPlay
        />
    </div>
}
