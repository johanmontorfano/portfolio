import { CSSProperties, useEffect, useState } from "react";

export const ResponsiveComponent = (props: {
  style: CSSProperties;
  mobile_style: CSSProperties;
  children?: any;
}) => {
  const [isMobile, setMobile] = useState<boolean>(window.innerWidth < 1024);

  useEffect(() => {
    const interval = setInterval(() => setMobile(window.innerWidth < 1024), 1);

    return function cleanup() {
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={isMobile ? props.mobile_style : props.style}>
      {props.children}
    </div>
  );
};
