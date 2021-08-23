import { useEffect, useState } from "react";
import { fromEvent } from "rxjs";
import { map, throttleTime as _throttle } from "rxjs/operators";

/**
 * shared data about simulated cursor position
 */
const simulatedCursor = {
  x: 0,
  y: 0,
};

//update simulatedCursor position, even if the device is not mobile
setInterval(() => {
  const generatePosition = (maxRange: number) =>
    Math.floor(Math.random() * maxRange);

  simulatedCursor.x = generatePosition(window.innerWidth - 125);
  simulatedCursor.y = generatePosition(window.innerHeight);
}, 20);

/**
 * returns x,y position of the cursor at 62.5fps
 */
export function useMouseMove(throttleTime = 100) {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    //on desktop, useMouseMove returns position of the cursor.
    //on mobile, useMouseMove, simulates cursor moves.
    if (!isMobile) {
      const sub = fromEvent(document, "mousemove")
        .pipe(
          _throttle(throttleTime),
          map((event: any) => [event.clientX, event.clientY])
        )
        .subscribe(([newX, newY]) => {
          setX(newX);
          setY(newY);
        });

      return function cleanup() {
        sub.unsubscribe();
      };
    } else {
      setX(window.innerWidth / 2);
      setY(window.innerHeight / 2);
    }
  }, []);

  return [x, y];
}
