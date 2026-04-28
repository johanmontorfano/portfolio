"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/scripts/firebase/client";

export default function Page() {
    const router = useRouter();

    const [step, setStep] = useState<"email" | "password">("email");
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

        if (step === "email") {
            if (formData.email.includes("@")) {
                setError("");
                setStep("password");
            } else {
                setError("Please enter a valid email.");
            }
            return;
        }

        setIsLoading(true);
        setError("");
        await signInWithEmailAndPassword(auth, formData.email, formData.password)
            .then(async (token) => {
                const idToken = await token.user.getIdToken();
                
                fetch(
                    "/auth/redirect",
                    {
                        method: "POST",
                        body: JSON.stringify({
                            token: idToken
                        })
                    }
                ).then(async (data) => {
                    const body = await data.json();

                    if ("error" in body) setError(body["error"]);
                    else router.push(body["appUrl"]);
                }).catch((err) => {
                    console.log(err);
                    setError("Failed to finalize authentication");
                })
            }).catch((err) => setError(err)).finally(() => setIsLoading(false));
    };

    return (
        <main className="flex h-dvh items-center justify-center bg-black text-white">
            <section className="w-full max-w-sm bg-zinc-900 rounded-lg p-6 border border-zinc-800 shadow-xl">
                <header className="mb-6">
                    <h1 className="text-xl font-bold tracking-tight">
                        {step === "email" ? "Sign in" : "Welcome back"}
                    </h1>
                    <p className="text-sm text-zinc-400">
                        {step === "email" 
                            ? "Enter your email to get started" 
                            : `Enter password for ${formData.email}`}
                    </p>
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
                    {step === "email" ? (
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                                Email Address
                            </label>
                            <input
                                autoFocus
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                placeholder="name@company.com"
                            />
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                                Password
                            </label>
                            <input
                                autoFocus
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    )}
                    <div className="flex items-center justify-between pt-2">
                        {step === "password" && (
                            <button
                                type="button"
                                onClick={() => setStep("email")}
                                className="text-xs text-zinc-500 hover:text-white cursor-pointer transition-colors"
                            >
                                Back
                            </button>
                        )}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="ml-auto px-5 py-2 rounded-md bg-blue-600 text-xs font-semibold hover:bg-blue-500 transition-all disabled:opacity-50 flex items-center justify-center cursor-pointer"
                        >
                            {isLoading ? "..." :
                                step === "email" ? "Continue" : "Sign In"}
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
}
