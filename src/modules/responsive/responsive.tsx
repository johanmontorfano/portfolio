import { motion, Target, useAnimation, VariantLabels } from "framer-motion";
import { useEffect, useState } from "react";

export const ResponsiveComponent = (props: {
  style: boolean | Target | VariantLabels | undefined;
  mobile_style: boolean | Target | VariantLabels | undefined;
  children?: any;
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

  const variants: { [key: string]: any } = {
    desktop: props.style,
    mobile: props.mobile_style,
  };

  return (
    <div style={isMobile? variants.mobile : variants.desktop}>
      {props.children}
    </div>
  );
};
