import { useEffect, useState } from "react";

type Component = any;

export const ConditionnalComponent = (props: {
  True: Component;
  False: Component;
  condition: boolean;
  children: JSX.Element;
  TrueProps?: { [key: string]: any };
  FalseProps?: { [key: string]: any };
}) => {
  const [Component, setComponent] = useState<Component>(props.True);
  const [Props, setProps] = useState<{ [key: string]: any } | undefined>(
    props.TrueProps
  );

  useEffect(() => {
    setComponent(props.condition ? props.True : props.False);
    setProps(props.condition ? props.TrueProps : props.FalseProps);
  }, [props.condition]);

  return <Component {...Props}>{props.children}</Component>;
};
