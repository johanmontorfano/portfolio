"use client";

import { ComponentType, lazy, LazyExoticComponent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BsArrowLeft, BsList, BsPauseFill, BsPlayFill, BsXCircleFill } from "react-icons/bs";
import { Chapter, usePlayer } from "../player/context";
import meta from "@/public/data/metadata.json";

// PERF: we will be opting to a modular loader system where a module entry is
// composed of <loader>/<name>. the loader gets the name and it is up to its
// discrecy to return the appropriate DOM elements depending on the name
// NOTE: available loaders are:
// - url -> redirects to a specific URL
// - jsx -> loads a JSX scene module
// - none -> does nothing except loading metadata
// - video -> loads a video from a public path

interface DigestedChapter {
    desc: string | null;
    videoURL: string | null;
    component: LazyExoticComponent<ComponentType<any>> | null;
    goBack: boolean;
    from: Chapter;
}

// this file will be used to develop a component to properly load scenes wether
// those are videos or code
export function DynamicSceneLoader() {
    const player = usePlayer();
    
    const [started, setStarted] = useState(false);
    const [showMenu, setShowMenu] = useState(true);
    const [showPlayer, setShowPlayer] = useState(false);
    const [chapterData, setChapterData] = useState<DigestedChapter>({
        desc: null, component: null, videoURL: null, goBack: false,
        from: player.chapter
    })

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
        let {
            module, enableBackNavigation,
            disableIntro, disableRerender
        } = player.chapter;

        if (disableRerender) return;

        const bsl = module.indexOf("/");
        const [loader, name] = [module.slice(0, bsl), module.slice(bsl + 1)];
        const out: DigestedChapter = {
            desc: null, component: null, videoURL: null, goBack: false,
            from: player.chapter
        };

        if (disableIntro === undefined) disableIntro = false;
        if (["url", "gh"].includes(loader)) {
            const url = loader === "url" ?
                name : `https://github.com/johanmontorfano/${name}`;

            if (enableBackNavigation) {
                window.open(url);
                player.setChapter({
                    ...chapterData.from,
                    disableRerender: true
                });
            } else window.location.assign(url);
        } else {
            out.goBack = enableBackNavigation ?? false;
            out.desc = (meta as Record<string, string>)[name];
            if (loader === "video") out.videoURL = "/assets/video/" + name;
            else if (loader === "jsx") out.component = lazy(() => import(
                `@/components/scenes/by_module/${name}.tsx`
            ));

            setStarted(disableIntro);
            setShowMenu(!disableIntro);
            setShowPlayer(disableIntro);
            setChapterData(out);
        }
    }, [player.chapter.module]);

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
                key={chapterData.from.title}
            >
                <motion.h1
                    className="text-4xl font-bold text-center"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={appear}
                    custom={0}
                >
                    {chapterData.from.title}
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
                    {chapterData.goBack && <motion.button
                        className="btn icon"
                        onClick={() => {
                            player.goBack();
                        }}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={appear}
                        custom={2}
                    >
                        <BsArrowLeft size={18} />
                    </motion.button>}
                    <motion.button
                        className="btn icon"
                        onClick={() => player.togglePause()}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={appear}
                        custom={3}
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
                        custom={4}
                    >
                        <BsPlayFill size={22} />
                        {started ? "Continue" : "Play"} 
                    </motion.button>}
                </div>
            </motion.div>
        }</AnimatePresence>
        <AnimatePresence mode="wait">{started && <motion.div
            className="relative w-full h-dvh"
            initial={{ opacity: 1, pointerEvents: "none" }}
            animate={{
                opacity: showPlayer ? 1 : 0,
                pointerEvents: showPlayer ? "auto" : "none"
            }}
            key={chapterData.from.title}
        >
            <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={appear}
                custom={0}
            >
                {chapterData.component && <chapterData.component key="jsx" />}
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
        </motion.div>}</AnimatePresence>
    </motion.div>
}
