/** Styling data about skills. */
export interface TagData {
    icon: string;
    color: string;
    background: string;
    showTitle: boolean;
    scale?: number;
}

/** Return styling data about tags. */
function getTag(skill: string): TagData {
    switch (skill) {
        case "Next.js":
            return {
                icon: "/assets/svg/next.svg",
                color: "black",
                background: "white",
                showTitle: false
            }
        case "Postgres":
            return {
                icon: "/assets/svg/postgres.svg",
                color: "#336791",
                background: "#CCDFEA",
                showTitle: false
            }
        case "Supabase":
            return {
                icon: "/assets/svg/supabase.svg",
                color: "#1F1F1F",
                background: "#1F1F1F",
                showTitle: false,
                scale: 1.3
            }
        case "Vercel":
            return {
                icon: "/assets/svg/vercel.svg",
                color: "black",
                background: "black",
                showTitle: false
            }
        case "Tauri":
            return {
                icon: "/assets/svg/tauri.svg",
                color: "black",
                background: "linear-gradient(45deg, rgba(36,200,219,1) 50%, rgba(255,193,49,1) 50%)",
                showTitle: false,
                scale: 1.6
            }
        case "Rust":
            return {
                icon: "/assets/svg/rust.svg",
                color: "black",
                background: "white",
                showTitle: false,
                scale: 1.8
            }
        case "Tailwind":
            return {
                icon: "/assets/svg/tailwind.svg",
                color: "#38BDF8",
                background: "white",
                showTitle: false
            }
        case "Softbuffer":
        case "Rocket.rs":
        case "Winit":
            return {
                icon: "/assets/svg/cargo.svg",
                color: "#674E1C",
                background: "white",
                showTitle: true,
                scale: 1.6
            }
        default:
            return {
                icon: "/assets/svg/default.svg",
                color: "black",
                background: "white",
                showTitle: true,
                scale: 1.6
            };
    }
}

export function Tags(props: {skill: string}) {
    const tagData = getTag(props.skill);

    return <div style={{
        display: "flex",
        "align-items": "center"
    }}>
        <img src={tagData.icon} height={13 * (tagData.scale || 1)} />
        {tagData.showTitle ? <p style={{
            "font-size": "20px",
            "margin-block": 0,
            "font-weight": "600",
            "font-variant": "all-small-caps",
            color: tagData.color
        }}>{props.skill}</p> : null}
    </div>
}
