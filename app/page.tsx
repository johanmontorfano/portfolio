import { DynModuleLoader } from "@/components/scenes/spec_loader";
import { DocumentSmoothScroll } from "@/components/smooth_scroll";
import { BsAward, BsCameraVideo } from "react-icons/bs";
import Image from "next/image";

import Logo from "@/public/assets/logo.svg";
import p2pData from "@/public/data/p2p.json";
import JobBoard from "@/components/job_board";

export default function Page() {
    const beganCodingAt = new Date("07-10-2016");
    const beenCodingFor =
        new Date().getFullYear() - beganCodingAt.getFullYear();

    return (
        <div className="max-w-[800px] w-[90%] mx-auto">
            <DocumentSmoothScroll />
            <header className="pt-48">
                <Image alt="logo" src={Logo} className="w-10 h-10 invert" />
                <br />
                <h1 className="text-4xl font-bold">Hi, I am Johan!</h1>
            </header>
            <br />
            <main className="flex flex-col gap-4">
                <p>
                    Based in Lyon, France, my area of interest and expertise
                    always resided in building highly resilient, efficient, and
                    autonomous systems with innovative approaches.
                </p>
                <p>
                    My first ever project, {beenCodingFor} years ago, consisted
                    of a <code>super shell</code> built in Java to get the
                    current weather, launch apps, and save notes.
                </p>
                <div className="py-4 w-full flex flex-col items-center justify-center">
                    <DynModuleLoader module="jsx/shell" />
                    <p className="italic text-xs opacity-60 w-full max-w-[500px]">
                        Here is the shell, ported to the web.
                    </p>
                </div>
                <p>
                    Specialised in{" "}
                    <span className="showoff">full-stack</span>,{" "}
                    <span className="showoff">decentralised</span>, and{" "}
                    <span className="showoff">innovative</span> R&D; I
                    worked on various projects involving either{" "}
                    <span className="showoff">
                        heavy back-end skills
                    </span>
                    , a{" "}
                    <span className="showoff">
                        research-driven workflow
                    </span>
                    , or{" "}
                    <span className="showoff">
                        basic full-stack development skills.
                    </span>
                </p>
                <h2 className="text-2xl font-semibold">Work history</h2>
                <JobBoard />
                <p className="text-sm opacity-60">
                    Non-exhausitve. <a
                        className="underline"
                        target="_blank"
                        href="https://linkedin.com/in/jhnm"
                    >Check out LinkedIn</a>.
                </p>
                <h2 className="text-2xl font-semibold">Projects</h2>
                <div className="card bg-base-200 border border-base-300">
                    <div className="card-body">
                        <div className="flex gap-2 items-stretch">
                            <div className="badge badge-xs badge-primary">
                                <BsAward />
                                Awarded
                            </div>
                            <div className="badge badge-warning badge-xs">
                                <BsCameraVideo />
                                Video soon to be released
                            </div>
                        </div>
                        <h3 className="card-title">
                            Multi-modal Authenticity Capture in 
                            Untrusted Environments
                        </h3>
                        <p className="text-justify">
                            In the era of generative AI, it is becoming harder
                            to distinguish real and fake content. After 
                            developing a cryptographic process to ensure media
                            metadata cannot be changed and reduce the attack
                            surface for spoofing, I realized that data produced
                            by electronic components cannot be 100% trusted.
                        </p>
                        <p className="text-justify">
                            The reason comes down to the fact that components
                            have no idea of the realness of surrounding 
                            components nor software has. While we saw the rise
                            of hardware-dependent cryptographic proofs of 
                            realness, this technique merely solves the issue 
                            and the attack surface for component spoofing is 
                            still too vast to trust anything that can solely 
                            be verified by a device being operational.
                        </p>
                        <p className="text-justify">
                            Therefore, I came up with a physics-based media
                            verification that combines multiple physics signals
                            together to determine if something shot is 
                            physically plausible or not. If it is not, it means
                            the footage has either been modified or generated.
                        </p>
                        <div className="bg-base-300 shadow-lg p-2 m-4 rounded-lg">
                            Currently, I am working on my free time with{" "} 
                            <a
                                href="https://shop.elephantrobotics.com/en-fr/products/myarm-m750"
                                className="underline"
                                target="_blank"
                            >
                                robotic
                            </a>{" "}
                            and photometric hardware to calibrate 
                            algorithms and make usage on mobile as smooth as
                            possible. With the aim of releasing a 
                            Proof-of-Concept.
                        </div>
                        <div className="flex gap-2 justify-end">
                            <a
                                className="px-4 btn btn-sm btn-primary"
                                target="_blank"
                                href="https://johanmontorfano.com/shared/c2449985-06f0-4623-8e7d-d0564b1c95b7"
                            >
                                Read paper
                            </a>
                            <div className="tooltip" data-tip="Calibrating algorithms :)">
                                <button className="px-8 btn btn-sm btn-disabled">
                                    Try
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-200 border border-base-300">
                    <figure className="bg-black">
                        <DynModuleLoader module="jsx/p2p" />
                    </figure>
                    <div className="card-body">
                        <h3 className="card-title">Decentralisation: Rift</h3>
                        <p className="text-justify">
                            Decentralisation has always been something I found a
                            deep interest in. As it involves building
                            intelligent and autonomous systems able to
                            communicate and maintain network consistency, I
                            always dreamt of (participating in) building a new
                            network able to democratise decentralisation as a
                            database/auth model.
                        </p>
                        <p className="opacity-60 italic">
                            My work towards this goal is punctuated by
                            publications, articles, and prototypes.
                        </p>
                        <ul className="list-disc pl-4">
                            {p2pData.projects.map((p, i) => (
                                <li
                                    key={i}
                                    className="hover:underline cursor-pointer italic opacity-60"
                                >
                                    <a href={p.module.slice(4)}>
                                        {p.name}: {p.desc}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="card bg-base-200 border border-base-300">
                    <figure className="bg-black">
                        <video
                            src="/media/jdos_scenery.mp4"
                            muted
                            controls
                            disablePictureInPicture
                            disableRemotePlayback
                        />
                    </figure>
                    <div className="card-body">
                        <h3 className="card-title">
                            Low-level development: Johan's Dumb Operating System
                        </h3>
                        <p className="text-justify">
                            Understanding and operating complex systems is
                            something I find particularly fulfilling. This 
                            desire led me to develop a full OS on my free time.
                        </p>
                        <p>
                            As of now, I am focusing on basic functionalities.
                            Such as:
                        </p>
                        <ul className="list-disc pl-4">
                            {[
                                "A bootloader",
                                "A kernel",
                                "User-spaces support",
                                "FAT16/32 support",
                                "VGA support",
                                "16-bit HW rendering",
                                "Desktop interface",
                                "Boot from disk",
                                "Programs and compilation",
                                "Internet support"
                            ].map((s, i) => (
                                <li key={i}>{s}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </main>
            <footer className="h-16" />
        </div>
    );
}
