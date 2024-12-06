import {Accessor, createContext, createSignal, JSX, useContext} from "solid-js";
import {PropertiesHyphen} from "csstype";

const ScrollCtx = createContext<{progression: Accessor<number>}>();

export function useScrollCtx(): {progression: Accessor<number>} {
    return useContext(ScrollCtx) as any;
}

/** This makes a scrolling progression context, the progression is given as a
* percentage of the viewport width travelled. Hence, this percentage will be
* >1 since the website WILL be longer than the viewport width. */
export function ScrollCtxProvider(props: {children: JSX.Element}) {
    const [progression, setProgression] = createSignal(0);
    let tracker!: HTMLDivElement;

    setInterval(() => {
        const p = -tracker.getBoundingClientRect().top / window.innerHeight;

        setProgression(p);
    }, 1000 / 60);

    return <ScrollCtx.Provider value={{progression}}>
        <div ref={tracker} />
        {props.children}
    </ScrollCtx.Provider>;
}

/** Updates the style of a component relative to scrolling progression. */
export function ScrollStyle(props: {
    from: PropertiesHyphen & {from: number}, 
    to: PropertiesHyphen & {goBy: number},
    children: any
}) {
    const [style, setStyle] = createSignal<PropertiesHyphen>(props.from);
    const ctx = useScrollCtx();

    function getValue(fromValue: any, toValue: any) {
        const progCtx = (ctx?.progression() - props.from.from) / props.to.goBy;
        const fromNb = parseFloat(fromValue);
        const toNb = parseFloat(toValue); 
        const val = fromNb + (toNb - fromNb) * progCtx;

        return typeof fromValue === "number" ? val :
            fromValue.replace(fromNb.toString(), val.toString());
    }

    setInterval(() => {
        const newStyle: any = {...style()};

        for (const item in props.from) {
            if (item == "from" && !(item in props.to)) continue;
            newStyle[item] = getValue(props.from[item], props.to[item]);
        }
        setStyle(newStyle);
    }, 1000 / 60);
    
    return <div style={style() as any}>{props.children}</div>
}
