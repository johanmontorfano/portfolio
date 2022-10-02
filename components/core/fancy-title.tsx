/** Shows a fancy title designed for articles, the `title` is designed
 * to work in a specific way. Please read the `params` documentation.
 * 
 * @param `props.title` Title to show, use `&` for a line-break.
 */
export function FancyTitle (props: {title: string}) {
    return <div style={{display: "flex", "flex-direction": "column", "align-items": "center"}}>
        {props.title.split("&").map((part) => <h1 style={{"font-family": "Roboto Condensed", padding: "0px"}}>{part}</h1>)}
    </div>
}