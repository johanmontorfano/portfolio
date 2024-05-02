/** Add multiple new event listeners with the same callback to an element. */
export function addEventListeners(
    item: any,
    events: (keyof WindowEventMap)[], 
    cb: () => void
) {
    events.forEach(eventType => {
        item.addEventListener(eventType, cb);
    });
}
