//control navigator throught features

export const ScrollFeature = (status: boolean) => {
    document.body.style.overflow = status? "initial" : "hidden"
}
export const MoveScroller = (x: number, y: number) => {
    window.scrollTo(x, y)
}