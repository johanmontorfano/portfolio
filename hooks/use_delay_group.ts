import { useState } from "react";

// Can be used to provide delay transition parameters for countless chained
// items with specific delay gap
export function useDelayGroup(secsGap = 1) {
    const [totalDelay, setTotalDelay] = useState(0);

    return (gap = secsGap) => {
        setTotalDelay(prev => prev + gap);
        return { delay: totalDelay + gap };
    };
}
