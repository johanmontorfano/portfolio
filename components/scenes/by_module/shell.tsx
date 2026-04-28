"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { BsSend } from "react-icons/bs";

interface OpenMeteoRes {
    current: {
        time: string;
        temperature_2m: number;
    };
    hourly: {
        time: string[];
        temperature_2m: number[];
    };
}

// Plugin ecosystem for the shell with autocompletion data
const plugins: Record<
    string,
    {
        autocomplete: string[];
        onCommand: (args: string[]) => string[] | Promise<string[]>;
    }
> = {
    open: {
        autocomplete: ["http://", "https://"],
        onCommand(args: string[]) {
            try {
                const url = new URL(args[1]);

                setTimeout(() => window.open(url), 2000);
                return ["Opening " + url.hostname + "..."];
            } catch (_) {
                if (args[0] === "recall")
                    return ["You must provide a valid URL"];
                args[0] = "recall";
                args[1] = "https://" + args[1];
                return plugins.open.onCommand(args);
            }
        },
    },
    notes: {
        autocomplete: [
            "list",
            "read <id>",
            "write <id> <txt..> ",
            "delete <id>",
        ],
        onCommand(args: string[]) {
            switch (args[1]) {
                case "list":
                    const page = args.length > 2 ? parseInt(args[2]) : 0;
                    const out = [];

                    for (let i = page * 10; i <= page * 10 + 10; i++) {
                        if (i < localStorage.length) {
                            const key = localStorage.key(i)!;
                            const entry = localStorage.getItem(key)!;

                            out.push(`[${key}] ${entry.slice(0, 30)}`);
                        }
                    }
                    return out;
                case "read":
                    if (args.length < 3) return ["You must specify a note ID."];

                    const entry = localStorage.getItem(args[2]);

                    if (entry === null) return ["Note not found."];
                    return [entry];
                case "write":
                    if (args.length < 3)
                        return [
                            "You must write some text to save.",
                            "You must specify an ID for the note.",
                        ];
                    if (args.length < 4)
                        return ["You must write some text to save."];

                    localStorage.setItem(args[2], args.slice(3).join(" "));
                    return ["Note saved as " + args[2]];
                case "delete":
                    if (args.length < 3)
                        return ["You must specify an ID to delete."];
                    localStorage.removeItem(args[2]);
                    return [`Note ${args[2]} deleted!`];
                default:
                    return ["Invalid command :("];
            }
        },
    },
    weather: {
        autocomplete: ["current", "<place>"],
        async onCommand(args: string[]) {
            function getTempForMoment(
                data: OpenMeteoRes,
                moment: "morning" | "afternoon" | "night",
            ) {
                const ranges = {
                    morning: [5, 13],
                    afternoon: [13, 19],
                    night: [19, 5],
                };

                console.log(data);
                return data.hourly.temperature_2m.find((_, i) => {
                    const date = new Date(data.hourly.time[i]);

                    if (moment === "night")
                        return (
                            (date.getHours() >= ranges[moment][0] ||
                                date.getHours() < ranges[moment][1]) &&
                            date.getTime() - Date.now() > 0
                        );
                    return (
                        date.getHours() >= ranges[moment][0] &&
                        date.getHours() < ranges[moment][1] &&
                        date.getTime() - Date.now() > 0
                    );
                });
            }

            function composeSentence(data: OpenMeteoRes) {
                const now = new Date();
                const moment =
                    now.getHours() >= 5 && now.getHours() < 13
                        ? "morning"
                        : now.getHours() >= 13 && now.getHours() < 19
                          ? "afternoon"
                          : "night";
                const nextMoment =
                    moment === "morning"
                        ? "afternoon"
                        : moment === "afternoon"
                          ? "night"
                          : "morning";
                const nextTemp = getTempForMoment(data, nextMoment);

                const humanized =
                    nextMoment === "morning"
                        ? "This morning"
                        : nextMoment === "afternoon"
                          ? "In the afternoon"
                          : "During the night";

                return `It is currently ${
                    data.current.temperature_2m
                }° outside. ${humanized}, it will be ${nextTemp}°.`;
            }

            if (args.length < 2 || args[1] === "current") {
                const pos = (await new Promise((resolve) => {
                    navigator.geolocation.getCurrentPosition(
                        (pos) => {
                            resolve(pos);
                        },
                        () => resolve("Cannot get current location"),
                    );
                })) as GeolocationPosition | string;

                if (typeof pos === "string") return [pos];

                const conditionsRes = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${
                        pos.coords.latitude
                    }&longitude=${
                        pos.coords.longitude
                    }&current=temperature_2m&hourly=temperature_2m`,
                );

                return [composeSentence(await conditionsRes.json())];
            } else {
                const posRes = await fetch(
                    "https://geocoding-api.open-meteo.com/v1/search?name=" +
                        encodeURIComponent(args.slice(1).join(" ")),
                );
                const pos = await posRes.json();

                if (!("results" in pos)) return ["This is not a real place :("];
                const conditionsRes = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${
                        pos.results[0].latitude
                    }&longitude=${
                        pos.results[0].longitude
                    }&current=temperature_2m&hourly=temperature_2m`,
                );

                return [
                    `Here is the weather for ${pos.results[0].name}, ${
                        pos.results[0].country
                    }`,
                    composeSentence(await conditionsRes.json()),
                ];
            }
        },
    },
};

function getAutocompleteHints(input: string): string[] {
    const args = input.split(" ");
    const pluginName = args[0];

    // we suggest plugin names first as we cannot narrow down the autocomplete
    // selection as long as we don't know about the target plugin
    if (args.length === 1) {
        const matches = Object.keys(plugins).filter(
            (name) => name.startsWith(pluginName) && name !== pluginName,
        );
        return matches;
    }

    const plugin = plugins[pluginName];

    if (!plugin) return [];

    const userArgs = args.slice(1);
    const hints = new Set<string>();

    plugin.autocomplete.forEach((patternStr) => {
        const pattern = patternStr.split(" ");
        let isMatch = true;

        for (let i = 0; i < userArgs.length; i++) {
            const userToken = userArgs[i];
            const patternToken = pattern[i];
            const isLastUserToken = i === userArgs.length - 1;

            const lastPatternToken = pattern[pattern.length - 1];
            const isVariadic = lastPatternToken?.endsWith("..>");

            if (i >= pattern.length) {
                if (isVariadic && isLastUserToken) {
                    hints.add(lastPatternToken);
                } else if (!isVariadic) {
                    isMatch = false;
                }
                break;
            }

            if (isLastUserToken) {
                if (patternToken.startsWith("<")) {
                    hints.add(patternToken);
                } else if (patternToken.startsWith(userToken)) {
                    hints.add(patternToken);
                }
            } else {
                if (
                    !patternToken.startsWith("<") &&
                    patternToken !== userToken
                ) {
                    isMatch = false;
                    break;
                }
            }
        }
    });
    return Array.from(hints);
}

// This is a representation of the "legitimately" (might not really be) first
// ever project I built in Java ported to JS with a web-adequate UI
export default function Scene() {
    const [input, setInput] = useState<string>("");
    const [lastAnswer, setLastAnswer] = useState<string[]>([]);
    const timeout = useRef<NodeJS.Timeout>(null);
    const hints = getAutocompleteHints(input);

    async function onCommand() {
        if (input === "") return;

        const args = input.split(" ");

        if (args[0] in plugins) {
            setLastAnswer(await plugins[args[0]].onCommand(args));
        } else setLastAnswer(["Command not found"]);
        setInput("");
        if (timeout.current !== null) clearTimeout(timeout.current);
        timeout.current = setTimeout(() => setLastAnswer([]), 6000);
    }

    return (
        <motion.div layout className="flex flex-col gap-2 w-full max-w-[500px]">
            <div className="flex flex-col gap-2">
                <AnimatePresence mode="popLayout">
                    {lastAnswer.map((s, i) => (
                        <motion.div
                            key={s + i}
                            layout
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ bounce: 0 }}
                            className="bg-base-200/60 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md border border-white/10"
                        >
                            {s}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            <div className="flex flex-wrap gap-2">
                <AnimatePresence mode="popLayout">
                    {hints.map((hint) => (
                        <motion.span
                            key={hint}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="badge badge-primary cursor-pointer"
                            onClick={() => setInput(input + hint + " ")}
                        >
                            {hint}
                        </motion.span>
                    ))}
                </AnimatePresence>
            </div>
            <motion.form layout onSubmit={(ev) => {
                ev.preventDefault();
                onCommand();
            }}>
                <div className="join w-full shadow-lg">
                    <input
                        type="text"
                        placeholder="Type a command..."
                        className="input w-full join-item focus:outline-none"
                        value={input}
                        onChange={(ev) => setInput(ev.target.value)}
                    />
                    <motion.button 
                        whileTap={{ scale: 0.95 }}
                        className="btn btn-primary join-item px-8"
                    >
                        <BsSend />
                    </motion.button>
                </div>
            </motion.form>
        </motion.div>
    );
}
