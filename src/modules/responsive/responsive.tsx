import { motion, Target, VariantLabels } from "framer-motion";
import { useEffect, useState } from "react";

export const ResponsiveComponent = (props: {
  style: boolean | Target | VariantLabels | undefined;
  mobile_style: boolean | Target | VariantLabels | undefined;
  children?: any;
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

  const variants: { [key: string]: any } = {
    desktop: props.style,
    mobile: props.mobile_style,
  };

  return (
    <div style={isMobile ? variants.mobile : variants.desktop}>
      {props.children}
    </div>
  );
};
