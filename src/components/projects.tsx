import { Accessor, For, Show, createResource } from "solid-js";
import { Motion } from "solid-motionone";
import { IoLink, IoLogoGithub } from "solid-icons/io";
import { Spinner, SpinnerType } from "solid-spinner";
import ProjectList from "../../public/static/projects.json";


interface Project {
    name: string;
    description: string;
    img_url?: string;
    homepage_url?: string;
    project_url?: string;
}

async function getRepositories() {
    return (await fetch("https://api.github.com/users/johanmontorfano/repos"))
        .json();
}

export function Projects(props: {
    show: Accessor<boolean>, 
    onRequestHide: () => void
}) {
    const [repositories] = createResource(getRepositories);

    return <>
        <Motion.div 
            style={{
                position: "absolute",
                height: "100%",
                width: "220px",
                background: "var(--green-1)"
            }}
            animate={{
                left: props.show() ? "-5%" : "100%"
            }} 
            transition={{
                duration: 1.35
            }}
        />
        <Motion.div
            style={{
                position: "absolute",
                height: "100%",
                width: "220px",
                background: "var(--green-2)"
            }}
            animate={{
                left: props.show() ? "-5%" : "100%"
            }}
            transition={{
                duration: 1.25,
                delay: 0.1
            }}
        />
        <Motion.div 
            style={{
                position: "absolute",
                height: "100%",
                width: "220px",
                background: "var(--green-3)"
            }}
            animate={{
                left: props.show() ? "-5%" : "100%"
            }}
            transition={{
                duration: 1.15,
                delay: 0.2
            }}
        />
        <Motion.div
            style={{
                position: "absolute",
                background: "var(--green-4)",
                width: "100%",
                height: "100dvh",
                overflow: "auto"
            }}
            animate={{
                left: props.show() ? "0%" : "100%"
            }}
            transition={{
                duration: 1.05,
                delay: 0.3
            }}
        >
            <div style={{
                width: "100%", 
                height: "20vh", 
                display: "flex", 
                "align-items": "center", 
                "justify-content": "center",
                position: "sticky",
                "mix-blend-mode": "exclusion",
                top: 0
            }}>
                <h1>Projects</h1>
            </div>
            <div style={{
                display: "grid",
                width: "100%",
                "justify-content": "center",
                gap: "25px",
                "row-gap": "50px",
                "grid-template-columns": 
                    "repeat(auto-fit, clamp(300px, 90vw, 500px))"
            }}>
                {(ProjectList as Project[]).map(p => (<Motion.div 
                    style={{
                        width: "100%",
                        "box-shadow": "0px 0px 0px 0px var(--green-5)",
                        "border-radius": "10px",
                        transition: "all .2s ease"
                    }}
                >
                    {p.img_url ? 
                        <img 
                            src={p.img_url} 
                            width="100%" 
                            style={{"border-radius": "10px"}}
                        /> : 
                        null
                    }
                    <h3 style={{"padding-top": "10px"}}>{p.name}</h3>
                    <div style={{
                        display: "grid",
                        gap: "10px", 
                        "grid-template-columns": "20px 20px",
                        "padding-top": "10px"
                    }}>
                        {p.homepage_url ? 
                            <IoLink 
                                style={{cursor: "pointer"}}
                                onClick={() => {
                                    window.location.assign(p.homepage_url as string)
                                }} 
                            /> :
                            null
                        }
                        {p.project_url ?
                            <IoLogoGithub 
                                style={{cursor: "pointer"}}
                                onClick={() => {
                                    window.location.assign(p.project_url as string)
                                }} 
                            /> :
                            null
                        }
                    </div>
                    <p style={{
                        "padding-top": "10px",
                        color: "var(--green-1)"
                    }}>
                        {p.description}
                    </p>
                </Motion.div>))}
                <div style={{"grid-column": "1 / -1"}}>
                    <br />
                    <br />
                    <h2 style={{
                        "font-family": "Libre Caslon Text",
                        "font-weight": 400,
                        display: "flex",
                        "align-items": "center"
                    }}>
                        Public Repositories
                        <Show when={repositories.loading}>
                            <Spinner width={20} 
                                type={SpinnerType.tailSpin} 
                                style={{"margin-left": "20px"}}
                            />
                        </Show>
                    </h2>
                    <br />
                    <For each={repositories()}>
                        {(data) => <div style={{"padding-bottom": "4px"}}>
                            <a href={data.html_url} target="_blank">
                                {data.full_name}
                            </a>
                        </div>}
                    </For>
                </div>
            </div>
            <br />
            <br />
            <br />
        </Motion.div>
    </>;
}
