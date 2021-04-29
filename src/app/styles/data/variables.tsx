export const StyleVariables = {
    colors: {
        "text@title": "black",
        "text@description": "rgb(75,75,75)",
        "text@char->hover": "rgb(48, 92, 211)",
        "text@char->tweened": "#F8E158",
        "shadow@box": "#5b5b5b",
        "shadow@box->hover": "#C6C6C6",
        "gradient@circle": "linear-gradient(36deg, rgba(38,104,255,1) 0%, rgba(178,43,255,1) 100%)",
        text: {
            whileHover1: "#ddad58",
            whileHover2: "#58dd75",
            whileHover3: "#bb4ae8"
        },
        radius: {
            multi: "radial-gradient(circle at top right, rgba(255,106,0,1) 10%, transparent 40%), radial-gradient(circle at right, rgba(255,0,0,1) 0%, transparent 60%), radial-gradient(circle at bottom right, rgba(72,0,255,1) 0%, transparent 60%)"
        },
        link: {
            default: "blue",
            whileHover: "violet"
        }
    },
    values: {
        shadows: {
            light: {
                default: "rgba(225, 225, 225, 0.5)",
                active: "rgba(255, 255, 255, 1)"
            },
            dark: {
                default: "rgba(0,0,0,0.5)",
                active: "rgba(0,0,0,1)"
            }
        },
        radius: {
            shortRadius: 15,
            longRadius: 30
        },
        font_size: {
            title: {
                default: "8vw",
                mobile: "14vw"
            },
            subtitle: {
                default: "4vw",
                mobile: "8vw"
            },
            description: {
                default: "2vw",
                mobile: "4vw"
            },
            text: {
                default: "1.5vw",
                mobile: "4vw"
            }
        },
        weight: {
            title: 800,
            subtitle: 600,
            description: 400,
            text: 400
        }
    }
}