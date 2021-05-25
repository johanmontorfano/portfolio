import { Parallax } from "react-scroll-parallax";

export const VerticalScrollParallaxFollowing = ({
  children,
}: {
  children: any;
}) => <Parallax y={["-50%", "50%"]}>{children}</Parallax>;
