import { HTMLAttributes } from "react";
import { useHistory } from "react-router";
import { navigate } from "../scripts/navigate";
//import style
import "./sass/link.scss";

//inteface for link params
interface LinkParams {
  to: string;
}
//extended interface to join link params and HTMLAttrs
interface CustomLinkType extends LinkParams, HTMLAttributes<HTMLDivElement> {}

export const Link = (props: CustomLinkType) => {
  //use useLocation hook to redirect without having to push NavLink on the JSX
  const location = useHistory();

  return (
    <div className="link" onClick={() => navigate(props.to)} {...props}>
      {props.children}
    </div>
  );
};
