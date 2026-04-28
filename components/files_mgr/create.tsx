"use client";

import { SubmitEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsX, BsShieldLock, BsPlus } from "react-icons/bs";

export function FileModalSummoner() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                className="btn btn-neutral gap-2"
                onClick={() => setOpen(true)}
            >
                <BsPlus className="text-lg" /> Add File
            </button>
            <SubmitFileModal isOpen={open} onClose={() => setOpen(false)} />
        </>
    );
}

export function SubmitFileModal({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const [isIdentityBound, setIsIdentityBound] = useState(false);
    const [emails, setEmails] = useState<string[]>([]);
    const [emailInput, setEmailInput] = useState("");
    const [loading, setLoading] = useState(false);

    const addEmail = () => {
        if (emailInput && !emails.includes(emailInput)) {
            setEmails([...emails, emailInput]);
            setEmailInput("");
        }
    };

    async function onSubmit(ev: SubmitEvent<HTMLFormElement>) {
        ev.preventDefault();
        setLoading(true);

        const desc = (ev.target[0] as HTMLInputElement).value;
        const files = (ev.target[1] as HTMLInputElement).files;
        const bound = (ev.target[2] as HTMLInputElement).checked;

        const refres = await fetch("/api/upload", {
            method: "POST",
            body: JSON.stringify({
                filename: files!.item(0)!.name,
                description: desc,
                identityBound: bound,
                boundToEmails: emails
            })
        });
        const refbody = await refres.json();

        if ("uploadUrl" in refbody) {
            await fetch(refbody.uploadUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/octet-stream"
                },
                body: files!.item(0)!
            });
        }
        setLoading(false);
        onClose();
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="modal modal-open items-center justify-center bg-black/60"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="modal-box max-w-[750px] w-full border border-white/10 p-0 overflow-hidden"
                    >
                        <div className="p-3 border-b border-base-300 flex justify-between items-center bg-base-200/50">
                            <h3 className="font-bold text-lg">
                                Upload Files
                            </h3>
                            <button
                                onClick={onClose}
                                className="btn btn-sm btn-circle btn-ghost"
                            >
                                <BsX className="text-xl" />
                            </button>
                        </div>

                        <form className="p-3 space-y-6" onSubmit={onSubmit}>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-bold uppercase tracking-widest text-[10px] opacity-60">
                                        Description
                                    </span>
                                </label>
                                <textarea
                                    rows={2}
                                    placeholder="Optional metadata description..."
                                    className="textarea w-full resize-none"
                                />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-bold uppercase tracking-widest text-[10px] opacity-60">
                                        Files
                                    </span>
                                </label>
                                <input
                                    type="file"
                                    className="file-input w-full"
                                />
                            </div>
                            <div className={`card card-compact border transition-colors ${
                                isIdentityBound ? "border-primary/30 bg-primary/5" : "border-base-300 bg-base-200/30"}`}
                            >
                                <div className="card-body">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`p-2 rounded-lg ${isIdentityBound ? "bg-primary text-primary-content" : "bg-base-300 opacity-50"}`}
                                            >
                                                <BsShieldLock />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold">
                                                    Identity Bound Access
                                                </p>
                                                <p className="text-xs opacity-60">
                                                    Whitelist specific users
                                                </p>
                                            </div>
                                        </div>
                                        <input
                                            type="checkbox"
                                            className="toggle toggle-primary"
                                            checked={isIdentityBound}
                                            onChange={() =>
                                                setIsIdentityBound(
                                                    !isIdentityBound,
                                                )
                                            }
                                        />
                                    </div>

                                    {isIdentityBound && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{
                                                height: "auto",
                                                opacity: 1,
                                            }}
                                            className="mt-4 pt-4 border-t border-base-300"
                                        >
                                            <div className="join w-full">
                                                <div className="relative flex-1 join-item">
                                                    <input
                                                        type="email"
                                                        value={emailInput}
                                                        onChange={(e) =>
                                                            setEmailInput(
                                                                e.target.value,
                                                            )
                                                        }
                                                        onKeyDown={(e) =>
                                                            e.key === "Enter" &&
                                                            (e.preventDefault(),
                                                            addEmail())
                                                        }
                                                        placeholder="collaborator@company.com"
                                                        className="input input-bordered w-full pl-10 join-item"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={addEmail}
                                                    className="btn btn-primary join-item"
                                                >
                                                    <BsPlus className="text-xl" />
                                                </button>
                                            </div>
                                            <div className="flex flex-wrap gap-2 mt-4">
                                                {emails.map((email) => (
                                                    <div
                                                        key={email}
                                                        className="badge badge-neutral py-3 gap-2"
                                                    >
                                                        <span className="text-[10px] font-mono">
                                                            {email}
                                                        </span>
                                                        <BsX
                                                            className="cursor-pointer hover:text-error"
                                                            onClick={() =>
                                                                setEmails(
                                                                    emails.filter(
                                                                        (e) =>
                                                                            e !==
                                                                            email,
                                                                    ),
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                            <div className="modal-action mt-0">
                                <input
                                    disabled={loading}
                                    type="submit"
                                    value="Upload"
                                    className="btn btn-primary px-8"
                                />
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
