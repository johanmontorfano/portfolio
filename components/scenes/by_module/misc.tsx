import { TypeWriter } from "@/components/ascii/basic/typewriter";
import { useASCIIEngine } from "@/components/ascii/context";
import { Center } from "@/components/ascii/basic/center";
import { FadeOut } from "@/components/ascii/basic/fade_out";
import { Destroy } from "@/components/ascii/basic/destroy";
import { useOnMount } from "@/hooks/use_on_mount";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePlayer } from "@/components/player/context";
import data from "@/public/data/misc.json";

function ProjectList(props: {
    // requires a module name even for url paths specified as url/<url>
    entries: { name: string, desc: string, module: string }[]
}) {
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

    return <motion.div className="grid grid-cols-1">
        <AnimatePresence>
            {props.entries.map((entry, i) =>
                <motion.div
                    onClick={() => {
                        player.setChapter({
                            title: entry.name,
                            module: entry.module,
                            disableIntro: true,
                            enableBackNavigation: true
                        });
                    }}
                    variants={appear}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="hover:[&_p]:underline cursor-pointer flex items-end gap-6"
                    custom={i}
                    key={i}
                >
                    <p className="text-lg">{entry.name}</p>
                    <span className="text-current/60">{entry.desc}</span>
                </motion.div>
            )}
        </AnimatePresence>
    </motion.div>
}

export default function Scene() {
    const ascii = useASCIIEngine();
    const [showProjectList, setShowProjectList] = useState(false);

    useOnMount(() => {
        ascii.debug();
        ascii.addElement(new TypeWriter(data.intro, 41)
            .extendWith(Center)
            .extendWith(FadeOut.withDurationAndTimeout(1000, 2500))
            .extendWith(Destroy.withTimeout(4000)));
        ascii.attach("#misc_ascii_main");
        setTimeout(() => setShowProjectList(true), 4000);
    });

    return <div className="relative w-full h-dvh flex items-center justify-center">
        {showProjectList && <ProjectList entries={data.projects} />}
        <div className="absolute pointer-events-none" id="misc_ascii_main" />
    </div>
}
