"use client";

import { motion } from "framer-motion";
import jobData from "@/public/data/jobs.json";

// Sharper, faster transitions
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.05 }, // Much faster stagger
    },
};

const cardVariants = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 },
};

export default function JobBoard() {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-2"
        >
            {jobData.map((job, i) => (
                <motion.div
                    key={i}
                    variants={cardVariants}
                    className="card bg-base-200 group border-base-content border border-white/10 p-0"
                >
                    <div className="card-body flex flex-col h-full justify-between p-0">
                        <div className="p-6 flex flex-col gap-4">
                            <div>
                                <div className="flex justify-between items-start">
                                    <h3 className="text-xl font-black uppercase italic">
                                        {job.job}
                                    </h3>
                                    {job.icon && 
                                        <img src={job.icon} alt="job icon" className="w-6 h-6" />}
                                </div>
                                <p className="text-sm opacity-60">
                                    {job.company}
                                </p>
                            </div>
                            <div className="text-sm font-medium leading-relaxed max-w-prose">
                                {job.description}
                            </div>
                            <div className="text-xs opacity-70 border-l-2 border-current pl-4 py-1">
                                <span className="uppercase font-bold block mb-1 text-[10px]">
                                    Context / Exit
                                </span>
                                {job.leavingReason}
                            </div>
                        </div>
                        <div className="flex gap-4 py-4 px-6 border-t border-white/10">
                            {Object.entries(job.links).map(([label, url]) => (
                                <a
                                    key={label}
                                    href={url}
                                    target="_blank"
                                    className="text-xs uppercase hover:underline"
                                >
                                    {label}
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
}
