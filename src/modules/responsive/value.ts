export const ResponsiveValue = (
  desktop: any,
  mobile: any,
  useBasicResponsiveRules?: boolean
): any => {
  const isMobile = useBasicResponsiveRules
    ? window.outerWidth < 1024
    : (window.outerWidth < 1024 &&
        window.outerWidth / window.outerHeight <= 1) ||
      window.outerWidth < window.outerHeight;

  return isMobile ? mobile : desktop;
};
