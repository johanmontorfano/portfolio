"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/scripts/firebase/client";
import { BsEnvelope, BsKey } from "react-icons/bs";

export default function Page() {
    const router = useRouter();

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // the submit even can be triggered both for navigation and actual auth so
    // we verify first we are at the password step (the even is fired to auth)
    async function onSubmit(e: React.SubmitEvent) {
        e.preventDefault();

        setIsLoading(true);
        setError("");
        try {
            await signInWithEmailAndPassword(auth, formData.email, formData.password)
                .then(async (token) => {
                    const idToken = await token.user.getIdToken();
                    
                    await fetch("/auth/redirect", {
                        method: "POST",
                        body: JSON.stringify({ token: idToken })
                    }).then(async (data) => {
                        const body = await data.json();

                        if ("error" in body) setError(body["error"]);
                        else router.push(
                            new URL(location.href).searchParams.get("next") ||
                            body["appUrl"]
                        );
                    }).catch((err) => {
                        console.log(err);
                        setError("Failed to finalize authentication");
                    })
            });
        } catch (e) {
            console.error(e);
            setError("Failed to authenticate");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="flex h-dvh items-center justify-center">
            <section className="w-full max-w-sm bg-base-200 border border-base-300 p-6">
                <header className="mb-6">
                    <h1 className="text-xl font-bold tracking-tight">
                        Welcome back
                    </h1>
                </header>
                <form
                    onSubmit={onSubmit}
                    className="space-y-4"
                >
                    {error && (
                        <div className="rounded border border-red-900/50 bg-red-900/20 p-3 text-xs text-red-400">
                            {error}
                        </div>
                    )}
                        <div className="space-y-2">
                            <label className="input w-full validator">
                                <BsEnvelope />
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="name@company.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    autoFocus
                                    required
                                />
                            </label>
                            <div className="validator-hint hidden">
                                Enter valid email address
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="input w-full">
                                <BsKey />
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                        </div>
                    <div className="flex items-center justify-between pt-2">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn btn-primary ml-auto"
                        >
                            {isLoading ?
                                <span className="loading loading-spinner" /> :
                                "Continue"
                            }
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
}
