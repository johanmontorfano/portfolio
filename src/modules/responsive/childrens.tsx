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
      ? window.outerWidth < 1024
      : (window.outerWidth < 1024 &&
          window.outerWidth / window.outerHeight <= 1) ||
          window.outerWidth < window.outerHeight
  );

  useEffect(() => {
    const interval = setInterval(
      () =>
        setMobile(
          props.useBasicResponsiveRules
            ? window.outerWidth < 1024
            : (window.outerWidth < 1024 &&
                window.outerWidth / window.outerHeight <= 1) ||
                window.outerWidth < window.outerHeight
        ),
      10
    );

    return function cleanup() {
      clearInterval(interval);
    };
  }, []);

  return isMobile ? props.children[1] : props.children[0];
};
