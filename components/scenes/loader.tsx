"use client";

import { ComponentType, lazy, LazyExoticComponent, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BsList, BsPauseFill, BsPlayFill, BsXCircleFill } from "react-icons/bs";
import { Chapter, usePlayer } from "../player/context";
import meta from "@/public/metadata.json";

// PERF: we will be opting to a modular loader system where a module entry is
// composed of <loader>/<name>. the loader gets the name and it is up to its
// discrecy to return the appropriate DOM elements depending on the name
// NOTE: available loaders are:
// - jsx -> loads a JSX scene module
// - none -> does nothing except loading metadata
// - video -> loads a video from a public path

// this file will be used to develop a component to properly load scenes wether
// those are videos or code
export function DynamicSceneLoader() {
    const player = usePlayer();
    
    const [started, setStarted] = useState(false);
    const [showMenu, setShowMenu] = useState(true);
    const [showPlayer, setShowPlayer] = useState(false);

    const chapterData = useMemo(() => {
        const out: {
            desc: string | null;
            videoURL: string | null;
            component: LazyExoticComponent<ComponentType<any>> | null;
        } = {
            desc: null, component: null, videoURL: null
        };
        const { module } = player.chapter;
        const [loader, name] = module.split("/");

        out.desc = (meta as Record<string, string>)[name];
        if (loader === "video") out.videoURL = "/assets/video/" + name;
        else if (loader === "jsx") out.component = lazy(() => import(
            `@/components/scenes/by_module/${module}`
        ));

        return out;
    }, [player.chapter.module]);

    const appear = {
        hidden: (i: number) => ({
            opacity: 0, y: 20, transition: { delay: i * 0.05 },
        }),
        visible: (i: number | [number, number]) => {
            if (typeof i === "number")
                return {
                    opacity: 1, y: 0, transition: { delay: i * 0.05 },
                }
            else
                return {
                    opacity: i[0], y: 0, transition: { delay: i[1] * 0.05 },
                }
        },
    };

    useEffect(() => {
        setStarted(false);
        setShowMenu(true);
        setShowPlayer(false);
    }, [player.chapter])

    return <motion.div
        className="w-full h-dvh bg-black flex justify-center items-center"
        animate={{
            scale: player.paused ? 0.8 : 1,
            opacity: player.paused ? 0.5 : 1,
            pointerEvents: player.paused ? "none": "auto"
        }}
        inherit={false}
    >
        <AnimatePresence mode="wait">{showMenu &&
            <motion.div
                className="flex flex-col items-center absolute"
                key={player.chapter.title}
            >
                <motion.h1
                    className="text-4xl font-bold text-center"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={appear}
                    custom={0}
                >
                    {player.chapter.title}
                </motion.h1>
                {chapterData.desc && <motion.p
                    className="max-w-[500px] w-[90%] text-center mt-2"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={appear}
                    custom={0.5}
                >{chapterData.desc}</motion.p>}
                {chapterData.component === null &&
                    chapterData.videoURL === null && <motion.div
                    className="flex items-center gap-2 mt-2"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={appear}
                    custom={[0.5, 1]}
                >
                    <BsXCircleFill size={12} />
                    <p>Scene unavailable</p>
                </motion.div>}
                <div className="flex justfy-center gap-2 mt-2">
                    <motion.button
                        className="btn icon"
                        onClick={() => player.togglePause()}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={appear}
                        custom={2}
                    >
                        <BsList size={18} /> Menu
                    </motion.button>
                    {(chapterData.component !== null ||
                        chapterData.videoURL !== null) && <motion.button
                        key="play"
                        className="btn icon"
                        onClick={() => {
                            setShowMenu(false);
                            setShowPlayer(true);
                            setStarted(true);
                        }}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={appear}
                        custom={3}
                    >
                        <BsPlayFill size={22} />
                        {started ? "Continue" : "Play"} 
                    </motion.button>}
                </div>
            </motion.div>
        }</AnimatePresence>
        <AnimatePresence>{showPlayer && <div
            className="relative w-full h-dvh"
            key={player.chapter.title}
        >
            <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={appear}
                custom={0}
            >
            </motion.div>
            <div className="absolute bottom-0 w-full p-4 gap-2 flex justify-center">
                <motion.button
                    key="play"
                    className="btn icon px-2"
                    onClick={() => {
                        setShowMenu(true);
                        setShowPlayer(false);
                    }}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={appear}
                    custom={1}
                >
                    <BsPauseFill size={26} /> 
                </motion.button>
                </div>
        </div>}</AnimatePresence>
    </motion.div>
}
