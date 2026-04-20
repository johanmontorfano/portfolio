"use client";

import { motion } from "framer-motion";
import {
    FaNetworkWired,
    FaUserShield,
    FaServer,
    FaGhost,
} from "react-icons/fa";
import {
    FiShare2,
    FiClock,
    FiShieldOff,
    FiKey,
    FiEyeOff,
    FiZap,
    FiAlertTriangle,
    FiActivity,
} from "react-icons/fi";

export const P2P_QUALITIES = {
    good: [
        {
            icon: <FaNetworkWired />,
            title: "Structural Resilience",
            desc: "No single point of failure; the network survives individual node outages.",
        },
        {
            icon: <FiShare2 />,
            title: "Censorship Resistance",
            desc: "Data cannot be easily de-platformed by a central authority.",
        },
        {
            icon: <FiActivity />,
            title: "Organic Scaling",
            desc: "Bandwidth and capacity naturally increase as more users join the swarm.",
        },
    ],
    bad: [
        {
            icon: <FaGhost />,
            title: "The Free-Rider Problem",
            desc: "Users consume resources without contributing back, degrading network health.",
        },
        {
            icon: <FiClock />,
            title: "High Latency & Churn",
            desc: "Node discovery and routing are slower due to constant topology changes.",
        },
        {
            icon: <FiShieldOff />,
            title: "Unreliable Availability",
            desc: "If the peers holding your specific data go offline, the data becomes temporarily inaccessible.",
        },
    ],
};

export const CR_QUALITIES = {
    good: [
        {
            icon: <FaUserShield />,
            title: "Absolute Sovereignty",
            desc: "'Identity Nodes' acts as an active bodyguard, negotiating access rather than surrendering data.",
        },
        {
            icon: <FiEyeOff />,
            title: "Zero-Knowledge Trust",
            desc: "ZK identity verification integrated in the P2P protocol allow verification of identity and authority without leaking cryptographic secrets.",
        },
        {
            icon: <FiZap />,
            title: "Incentivized Availability",
            desc: "Lightning Network integration creates a self-sustaining commodity market for tiered storage.",
        },
    ],
    bad: [
        {
            icon: <FaServer />,
            title: "The 'Fat Node' Paradox",
            desc: "Delegating identity nodes replication to commercial entities for high availability threatens to reintroduce Web2 centralization.",
        },
        {
            icon: <FiKey />,
            title: "Unforgiving Key Management",
            desc: "Because the root identity never leaves the device, losing the Master Key results in catastrophic, unrecoverable data loss when no identity nodes are replicated.",
        }
    ],
};

export function QualitiesShowcase(props: { qualities: typeof P2P_QUALITIES }) {
    const appear = {
        hidden: (i: number) => ({
            opacity: 0,
            y: 20,
            transition: {
                delay: i * 0.05,
                scale: { delay: 0 },
            },
        }),
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.05,
                scale: { delay: 0 },
            },
        }),
    };

    return (
        <div className="max-w-4xl grid md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
                {props.qualities.good.map((q, i) => (
                    <motion.div
                        key={i}
                        variants={appear}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        custom={i}
                        className="flex p-4 bg-green-950 rounded-lg border border-green-700"
                    >
                        <div className="text-2xl text-green-500 pr-2">
                            {q.icon}
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-200">
                                {q.title}
                            </h4>
                            <p className="text-sm text-gray-400 mt-1">
                                {q.desc}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
            <div className="flex flex-col gap-4">
                {props.qualities.bad.map((q, i) => (
                    <motion.div
                        key={i}
                        variants={appear}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        custom={props.qualities.good.length + i}
                        className="flex p-4 bg-red-950 rounded-lg border border-red-700"
                    >
                        <div className="text-2xl text-red-500 pr-2">
                            {q.icon}
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-200">
                                {q.title}
                            </h4>
                            <p className="text-sm text-gray-400 mt-1">
                                {q.desc}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
