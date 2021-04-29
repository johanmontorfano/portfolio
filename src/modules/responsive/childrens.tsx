import { useEffect, useState } from "react";

/**

ResponsiveChildrens props.children[]

<div>
  children[0]
</div>
<div>
  children[1]
</div>


**/

export const ResponsiveChilds = (props: {
  children: any[];
}) => {
  const [isMobile, setMobile] = useState<boolean>(window.innerWidth < 1024);

  useEffect(() => {
    const interval = setInterval(() => setMobile(window.innerWidth < 1024), 1);

    return function cleanup() {
      clearInterval(interval);
    };
  }, []);

  return isMobile ? props.children[1] : props.children[0];
};
