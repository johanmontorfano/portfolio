import { AnimatePresence, motion } from "framer-motion";
import { usePlayer } from "@/components/player/context";

export function ProjectList(props: {
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
