"use client";

import { DottedMap } from "@/components/map/map";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DigestedStep } from "@/components/steps";
import { useDottedMapController } from "@/hooks/use_dotted_map";
import { createLink } from "@/components/map/links";
import { rand, rsizeget } from "@/components/map/math";
import {
    CR_QUALITIES,
    P2P_QUALITIES,
    QualitiesShowcase
} from "@/components/scenes/with_components/p2p";

import DotMap from "@/public/maps/europe_map.json";
import data from "@/public/data/p2p.json";
import { BsPlay } from "react-icons/bs";

export default function Scene() {
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

    const map = useDottedMapController();

    const [step, setStep] = useState<DigestedStep>();
    // only used to trigger a memo recompute when replaying the scene
    const [playCounts, setPlayCounts] = useState(0);
    const [showMap, setShowMap] = useState(false);
    const [component, setComponent] = useState<ReactNode>(null);

    const timeoutList = useMemo(() => {
        let totalDuration = 0;

        if (playCounts === 0)
            return [setTimeout(() => {
                setStep({ id: -1, duration: 0, event: "END" });
            }, 0)]

        return data.steps.map((step, idx) => {
            let id = setTimeout(() => {
                setStep({ ...step, id: idx });
            }, totalDuration);
            totalDuration += step.duration;

            return id;
        });
    }, [playCounts]);

    useEffect(() => () => timeoutList.forEach(id => clearInterval(id)), [])
    useEffect(() => {
        if (step) switch (step!.event) {
            case "CENTRALIZED":
                data.map_data.points.centers.forEach(rc => map.trigger({
                    rc: { r: rc[0], c: rc[1] }
                }));
                data.map_data.links.centers.forEach(lk => map.trigger({
                    link: createLink(lk[0], lk[1])
                }));
                break;
            case "OUTAGE":
                map.trigger({ accent: "#FF0000" });
                data.map_data.links.centers.forEach(lk =>
                    map.trigger({ rmlink: createLink(lk[0], lk[1]) }));
                break;
            case "P2P":
                map.trigger({ accent: "#22c55e" });
                data.map_data.points.peers.forEach(rc => map.trigger({
                    rc: { r: rc[0], c: rc[1] }
                }));
                new Set([
                    ...data.map_data.points.centers,
                    ...data.map_data.points.peers
                ].map((_, x) => {
                    const conn = Math.ceil(rand(2));
                    const out: Array<[number, number]> = [];

                    for (let i = 0; i <= conn; i++) {
                        const direction = rand();
                        const remote = Math.max(1,
                            rsizeget(1, data.map_data.points.peers.length)[0]
                        );

                        if (direction < 0.5) out.push([x + 1, remote]);
                        else out.push([remote, x + 1]);
                    }
                    return out;
                }).flat()).forEach(l => map.trigger({
                    link: createLink(l[0], l[1], { curve: 0.2 })
                }));
                break;
            case "P2P_QUALITIES":
                setShowMap(false);
                setComponent(<QualitiesShowcase qualities={P2P_QUALITIES} />);
                break;
            case "CR_ABILITIES":
                setComponent(<QualitiesShowcase qualities={CR_QUALITIES} />);
                break;
            case "END":
                setComponent(<button className="btn" onClick={() => {
                    map.trigger({ reset: true });
                    setStep(undefined);
                    setComponent(null);
                    setShowMap(true);
                    setPlayCounts(prev => prev + 1);
                }}>
                    <BsPlay /> {playCounts === 0 ? "Play" : "Replay"}
                </button>);
                break;
            default:
                break;
        }
    }, [step]);

    return <div className="relative flex justify-center h-[70vh] min-h-[600px] items-center w-full overflow-hidden">
        <AnimatePresence mode="wait">
            {showMap && <motion.div
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 }
                    }}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                >
                <DottedMap data={DotMap} disableMutate className="rounded-lg" />
            </motion.div>}
            {step && component && <div key={step.id}>{component}</div>}
        </AnimatePresence>
        <div className="absolute bottom-6 left-6">
            <AnimatePresence mode="wait">
                {step?.text && <motion.p
                    variants={appear}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    key={step.id}
                    className="w-full max-w-[300px] text-white text-lg"
                >
                    {step.text}
                </motion.p>}
            </AnimatePresence>
        </div>
    </div>
}
