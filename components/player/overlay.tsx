"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PlayerChapters, Socials, usePlayer } from "./context";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import Logo from "@/public/assets/logo.png";

export function Overlay() {
    const player = usePlayer();
    const appear = {
        hidden: (i: number) => ({
            opacity: 0, y: 20, transition: {
                delay: i * 0.05,
                scale: { delay: 0 }
            },
        }),
        visible: (i: number) => ({
            opacity: 1, y: 0, transition: {
                delay: i * 0.05,
                scale: { delay: 0 }
            },
        }),
    };

    return <AnimatePresence>
        {player.paused && <motion.menu className="max-w-[300px] h-full pointer-events-auto">
            <div
                className="flex flex-col items-start justify-between h-full"
                style={{ transform: "perspective(14cm) rotateY(20deg)" }}
            >
                <div>
                    <motion.img
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={appear}
                        custom={0}
                        src={Logo.src}
                        className="invert"
                        width={100}
                        height={100}
                    />
                </div>
                <div className="user-select-none">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={appear}
                        custom={1}
                        className="flex items-center gap-2"
                    >
                        <p>Jump to</p>
                        <TbPlayerTrackNextFilled size={16} />
                    </motion.div>
                    <ul>
                        {PlayerChapters.map((chapter, i) => (
                            <motion.li
                                key={i}
                                className="cursor-pointer origin-left"
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={appear}
                                custom={1 + i}
                                whileHover={{ scale: 1.2 }}
                                style={{ textDecoration:
                                    player.chapter === chapter ?
                                        "underline" : "none"
                                }}
                                onClick={() => {
                                    player.togglePause();
                                    player.setChapter(chapter);
                                }}
                            >
                                {chapter.title}
                            </motion.li>
                        ))}
                    </ul>
                    <br />
                </div>
                <div className="flex items-center pb-8 [&_a]:mr-2">
                    {Socials.map((social, i) => (
                        <motion.a
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={appear}
                            custom={1 + PlayerChapters.length + i}
                            whileHover={{ scale: 1.2 }}
                            href={"https://" + social.target}
                            aria-label={social.title}
                            key={i}
                        >
                            <social.icon size={26} />
                        </motion.a>
                    ))}
                </div>
            </div>
        </motion.menu>}
    </AnimatePresence>
}
