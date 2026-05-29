import { Noto_Serif, Space_Grotesk, Space_Mono } from "next/font/google";

export const grotesk = Space_Grotesk();
export const mono = Space_Mono({ weight: "400" });
export const serif = Noto_Serif({ weight: ["400", "600"] });
