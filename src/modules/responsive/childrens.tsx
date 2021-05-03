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
  useBasicResponsiveRules?: boolean;
}) => {
  const [isMobile, setMobile] = useState<boolean>(
    props.useBasicResponsiveRules
      ? window.innerWidth < 1024
      : (window.innerWidth < 1024 &&
          window.innerWidth / window.innerHeight <= 1) ||
          window.innerWidth < window.innerHeight
  );

  useEffect(() => {
    const interval = setInterval(
      () =>
        setMobile(
          props.useBasicResponsiveRules
            ? window.innerWidth < 1024
            : (window.innerWidth < 1024 &&
                window.innerWidth / window.innerHeight <= 1) ||
                window.innerWidth < window.innerHeight
        ),
      10
    );

    return function cleanup() {
      clearInterval(interval);
    };
  }, []);

  return isMobile ? props.children[1] : props.children[0];
};
