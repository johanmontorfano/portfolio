import { useEffect, useLayoutEffect } from "react";
import { useState } from "react";

//component which handle the theme and have only children as prop
export const Themed = ({ children }: { children: any }) => {
  //get theme
  const getDeviceTheme = () => {
    //get the preferred color of the device
    if (window.matchMedia("(prefers-color-scheme: dark)").matches)
      return "dark";
    else return "light";
  };

  //current theme stored here
  const [currentTheme, setTheme] = useState<"light" | "dark">(getDeviceTheme());

  //scope for theme changing
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    setTheme(getDeviceTheme());
  })
  //update body background on theme update
  useEffect(() => {
    document.body.style.setProperty("background", currentTheme === "dark"? "black" : "white")
  }, [currentTheme])

  //render with theme
  return <div className={currentTheme}>{children}</div>;
};
