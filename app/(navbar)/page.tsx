import Link from "next/link";
import { BsAwardFill, BsCameraVideoFill, BsPeopleFill } from "react-icons/bs";

const OS_FEATURES = [
    "Custom Stage-1 & Stage-2 Bootloaders",
    "Monolithic x86 Kernel Architecture",
    "User-space Ring-3 Isolation",
    "FAT16 / FAT32 Driver Implementation",
    "VGA Mode 13h & 16-bit HW Rendering",
    "Native Disk Read/Write Interrupts",
] as const;

export default function PortfolioPage() {
    return (
        <div className="mx-auto w-[90%] max-w-3xl py-24 sm:py-32">
            <header className="mb-2 space-y-6">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    Hi, I am Johan
                </h1>
            </header>
            <main className="space-y-2">
                <section className="space-y-4 text-neutral-300 mb-8">
                    <p>
                        Based in Lyon, France, my area of interest and expertise
                        always resided in building highly resilient, efficient,
                        and autonomous systems with innovative approaches.
                    </p>
                </section>
                <section className="space-y-6">
                    <div className="flex items-baseline justify-between">
                        <h2 className="text-xl font-semibold tracking-tight">
                            Work History
                        </h2>
                        <a
                            href="https://linkedin.com/in/jhnm"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-neutral-500 hover:text-neutral-300 hover:underline"
                        >
                            See on LinkedIn &rarr;
                        </a>
                    </div>
                </section>
                <section className="space-y-10">
                    <div className="flex items-baseline justify-between">
                        <h2 className="text-xl font-semibold tracking-tight">
                            Selected Projects
                        </h2>
                        <a
                            href="https://codeland.johanmontorfano.com/johan"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-neutral-500 hover:text-neutral-300 hover:underline"
                        >
                            See on Codeland &rarr;
                        </a>
                    </div>
                    <article className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/40 transition-colors hover:border-neutral-700">
                        <div className="space-y-4 p-6 sm:p-8">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-400">
                                    <BsAwardFill size={12} /> Awarded Research
                                </span>
                                <span className="inline-flex items-center gap-1.5 rounded-md bg-sky-500/10 px-2.5 py-1 text-xs font-medium text-sky-400">
                                    <BsCameraVideoFill size={12} /> Video
                                    Demonstration Forthcoming
                                </span>
                            </div>

                            <h3 className="text-xl font-semibold text-neutral-100">
                                Multi-modal Authenticity Capture in Untrusted
                                Environments
                            </h3>

                            <div className="space-y-3 text-sm leading-relaxed text-neutral-300">
                                <p>
                                    Hardware-level cryptographic attestation
                                    fails when peripheral sensors themselves can
                                    be spoofed. In adversarial environments, an
                                    operational signature only proves that a
                                    chip executed an instruction—not that the
                                    physical reality it recorded is authentic.
                                </p>
                                <p>
                                    This research couples deterministic
                                    photometric sensors and robotic spatial
                                    calibration to validate multi-modal physical
                                    invariants (light diffusion, spatial motion
                                    consistency). If sensor cross-validation
                                    violates physical laws, the media stream is
                                    marked compromised prior to any
                                    cryptographic hashing.
                                </p>
                            </div>
                            <div className="rounded-lg border border-neutral-800 bg-neutral-950/60 p-4 text-xs leading-normal text-neutral-400">
                                Calibrating physical multi-sensor arrays using
                                an{" "}
                                <a
                                    href="https://shop.elephantrobotics.com/en-fr/products/myarm-m750"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium text-neutral-200 underline decoration-neutral-600 underline-offset-4 hover:text-white"
                                >
                                    Elephant Robotics myArm M750
                                </a>{" "}
                                robotic manipulator to establish deterministic
                                ground truth for mobile inference models.
                            </div>

                            <div className="flex items-center gap-3 pt-2">
                                <a
                                    href="https://johanmontorfano.com/shared/c2449985-06f0-4623-8e7d-d0564b1c95b7"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center rounded-lg bg-white px-4 py-2 text-xs font-semibold text-neutral-950 transition-colors hover:bg-neutral-200"
                                >
                                    Read Paper (PDF)
                                </a>
                            </div>
                        </div>
                    </article>
                    <article className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/40 transition-colors hover:border-neutral-700">
                        <div className="space-y-4 p-6 sm:p-8">
                            <div className="flex items-center gap-2">
                                <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                                    <BsPeopleFill size={12} /> 150+ Daily Active
                                    Users
                                </span>
                            </div>

                            <h3 className="text-xl font-semibold text-neutral-100">
                                Lyondle & Custom Transit Ingestion Engine
                            </h3>

                            <div className="space-y-3 text-sm leading-relaxed text-neutral-300">
                                <p>
                                    A public-transit analysis suite disguised as
                                    daily geolocation and routing puzzles.
                                    Operates entirely on live, irregular GTFS
                                    and open transit feeds from Lyon's
                                    metropolitan network.
                                </p>
                                <p>
                                    To eliminate query overhead on unindexed
                                    public data, I implemented an in-memory
                                    ingestion engine and compact temporal graph
                                    database. This design reduced hosting
                                    overhead to near-zero while enabling
                                    sub-millisecond route verifications and
                                    immediate failover tolerance.
                                </p>
                            </div>

                            <div className="flex gap-4 pt-2 text-xs">
                                <Link
                                    href="/blog/7ecf765c-143f-43e0-b252-64191d08527c"
                                    className="font-medium text-neutral-400 hover:text-white hover:underline"
                                >
                                    Architecture Deep Dive &rarr;
                                </Link>
                                <a
                                    href="https://lyondle.fr"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium text-neutral-400 hover:text-white hover:underline"
                                >
                                    Live Application &rarr;
                                </a>
                            </div>
                        </div>
                    </article>
                    <article className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/40 transition-colors hover:border-neutral-700">
                        <div className="border-b border-neutral-800 bg-black">
                            <video
                                src="/media/jdos_scenery.mp4"
                                muted
                                controls
                                playsInline
                                disablePictureInPicture
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-4 p-6 sm:p-8">
                            <h3 className="text-xl font-semibold text-neutral-100">
                                JDOS: x86 Bare-Metal Operating System
                            </h3>

                            <p className="text-sm leading-relaxed text-neutral-300">
                                A personal operating system built from scratch
                                to study memory paging, interrupt handling, and
                                hardware abstractions without runtime crutches.
                            </p>

                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                {OS_FEATURES.map((feature, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-2 rounded border border-neutral-800/80 bg-neutral-950/50 px-3 py-2 text-xs font-mono text-neutral-400"
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/60" />
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </article>
                </section>
            </main>
        </div>
    );
}
