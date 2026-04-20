import { TypeWriter } from "@/components/ascii/basic/typewriter";
import { useASCIIEngine } from "@/components/ascii/context";
import { Center } from "@/components/ascii/basic/center";
import { FadeOut } from "@/components/ascii/basic/fade_out";
import { Destroy } from "@/components/ascii/basic/destroy";
import { useOnMount } from "@/hooks/use_on_mount";
import { useState } from "react";
import { ProjectList } from "../with_components/project_list";
import data from "@/public/data/misc.json";

export default function Scene() {
    const ascii = useASCIIEngine();
    const [showProjectList, setShowProjectList] = useState(false);

    useOnMount(() => {
        ascii.debug();
        ascii.addElement(new TypeWriter(data.intro, 41)
            .extendWith(Center)
            .extendWith(FadeOut.withDurationAndTimeout(1000, 2500))
            .extendWith(Destroy.withTimeout(4000)));
        ascii.attach("#misc_ascii_main");
        setTimeout(() => setShowProjectList(true), 4000);
    });

    return <div className="relative w-full h-dvh flex items-center justify-center">
        {showProjectList && <ProjectList entries={data.projects} />}
        <div className="absolute pointer-events-none" id="misc_ascii_main" />
    </div>
}
