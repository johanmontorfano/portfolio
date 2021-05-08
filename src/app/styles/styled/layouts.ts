import { GetClassnameValue } from "./index";
import { MotionProps } from "framer-motion";
import { EditJSONObjectFactory } from "../../../modules/var/edit-json-object";
import { UseNonUndefined } from "../../../modules/var/non-undefined-content";

// * * here there is the default style for any layout
// ! should always be the properties declared in a block editable on a Edit[X]Style block
export const LayoutStyles: {
  VideoLayout: MotionProps;
  ImageLayout: MotionProps;
  PageWrapper: MotionProps;
  BannerLayout: MotionProps;
  DescriptionLayout: MotionProps;
  TitleLayout: MotionProps;
  ButtonLayout: MotionProps;
  SubtitleLayout: MotionProps;
  TextareaLayout: MotionProps;
  InputLayout: MotionProps;
} = {
  VideoLayout: {
    initial: {
      objectFit: "cover",
      display: "block",
      borderRadius: GetClassnameValue("element-border-radius-size"),
      pointerEvents: "none",
      height: "0%",
      boxSizing: "content-box"
    },
  },
  ImageLayout: {
    initial: {
      borderRadius: GetClassnameValue("element-border-radius-size"),
    },
  },
  PageWrapper: {
    initial: {
      minHeight: "100vh",
      background: GetClassnameValue("background"),
    },
  },
  BannerLayout: {
    variants: {
      noBanner: {
        width: "96%",
        minHeight: "0vh",
        color: "white",
        background: "black",
        borderRadius: GetClassnameValue("element-border-radius-size"),
        y: "500%"
      },
      banner: {
        width: "96%",
        minHeight: "2vh",
        display: "flex",
        alignItems: "center",
        padding: "1%",
        borderRadius: GetClassnameValue("element-border-radius-size"),
        y: "0%"
      },
    },
  },
  DescriptionLayout: {
    initial: {
      fontFamily: "Helvetica",
      fontWeight: 600,
      color: GetClassnameValue("lessimportant-font-color"),
      textAlign: "justify",
    },
  },
  TitleLayout: {
    initial: {
      fontFamily: "Helvetica",
      fontWeight: parseInt(GetClassnameValue("bold-font-weight")),
      lineHeight: 1,
      whiteSpace: "pre-line",
      cursor: "default",
      userSelect: "none",
      background: "webkit-linear-gradient(#eee, #333)",
      WebkitBackgroundClip: "text",
      WebkitBackdropFilter: "transparent",
    },
  },
  ButtonLayout: {
    variants: {
      initial: {
        padding: "1.5vh",
        fontFamily: "Helvetica",
        background: GetClassnameValue("background-button"),
        borderRadius: GetClassnameValue("huge-element-border-radius-size"),
        color: GetClassnameValue("text-color-button"),
        textAlign: "center",
        border: "1px solid rgb(0,0,0)",
        scale: 1,
        height: "fit-content",
        fill: "black"
      },
      initialTiny: {
        padding: "1vh",
        fontFamily: "Helvetica",
        background: GetClassnameValue("background-button"),
        borderRadius: GetClassnameValue("huge-element-border-radius-size"),
        color: "rgb(0,0,0)",
        textAlign: "center",
        border: "1px solid rgb(0,0,0)",
        scale: 1,
        height: "fit-content",
        fill: "black"
      },
      active: {
        border: "1px solid " + GetClassnameValue("text-color-button-active"),
        color: GetClassnameValue("text-color-button-active"),
        background: GetClassnameValue("background-button-active"),
        fill: "white"
      },
      clicked: {
        border: "1px solid " + GetClassnameValue("text-color-button-active"),
        color: GetClassnameValue("text-color-button-active"),
        background: GetClassnameValue("background-button-active"),
        scale: 0.8
      },
    },
    whileHover: { scale: 1.05, cursor: "pointer" },
  },
  SubtitleLayout: {
    initial: {
      fontFamily: "Helvetica",
      fontWeight: parseInt(GetClassnameValue("semi-bold-font-weight")),
      textAlign: "justify",
    },
  },
  TextareaLayout: {
    initial: {
      outline: "none",
      width: "87.5%",
      resize: "none",
      boxShadow: "none",
      fontFamily: "Helvetica",
      borderRadius: GetClassnameValue("element-border-radius-size"),
      padding: "2%",
      background: GetClassnameValue("background"),
      border: "1px solid gray",
      color: GetClassnameValue("important-font-color"),
    },
  },
  InputLayout: {
    initial: {
      outline: "none",
      border: "1px solid gray",
      boxShadow: "none",
      width: "87.5%",
      resize: "none",
      height: "2vh",
      maxHeight: "400px",
      padding: "2%",
      fontFamily: "Helvetica",
      borderRadius: GetClassnameValue("element-border-radius-size"),
      background: GetClassnameValue("background"),
      color: GetClassnameValue("important-font-color"),
    },
  },
};

// * * here there is a function which returns a specific layout style with changes
export const EditVideoLayoutStyle = {
  initialBlock: EditJSONObjectFactory(
    UseNonUndefined(LayoutStyles.VideoLayout.initial)
  ),
  animateBlock: EditJSONObjectFactory(
    UseNonUndefined(LayoutStyles.VideoLayout.animate)
  ),
  blocks: EditJSONObjectFactory(UseNonUndefined(LayoutStyles.VideoLayout)),
};
export const EditImageLayoutStyle = {
  initialBlock: EditJSONObjectFactory(
    UseNonUndefined(LayoutStyles.ImageLayout.initial)
  ),
  animateBlock: EditJSONObjectFactory(
    UseNonUndefined(LayoutStyles.ImageLayout.animate)
  ),
  whileHoverBlock: EditJSONObjectFactory(
    UseNonUndefined(LayoutStyles.ImageLayout.whileHover)
  ),
  blocks: EditJSONObjectFactory(UseNonUndefined(LayoutStyles.ImageLayout)),
};
export const EditPageWrapperStyle = {
  initialBlock: EditJSONObjectFactory(
    UseNonUndefined(LayoutStyles.PageWrapper.initial)
  ),
  animateBlock: EditJSONObjectFactory(
    UseNonUndefined(LayoutStyles.PageWrapper.animate)
  ),
  blocks: EditJSONObjectFactory(UseNonUndefined(LayoutStyles.PageWrapper)),
};
export const EditBannerLayoutStyle = {
  initialBlock: EditJSONObjectFactory(
    UseNonUndefined(LayoutStyles.BannerLayout.initial)
  ),
  animateBlock: EditJSONObjectFactory(
    UseNonUndefined(LayoutStyles.BannerLayout.animate)
  ),
  blocks: EditJSONObjectFactory(UseNonUndefined(LayoutStyles.BannerLayout)),
};
export const EditDescriptionLayoutStyle = {
  initialBlock: EditJSONObjectFactory(
    UseNonUndefined(LayoutStyles.DescriptionLayout.initial)
  ),
  animateBlock: EditJSONObjectFactory(
    UseNonUndefined(LayoutStyles.DescriptionLayout.animate)
  ),
  blocks: EditJSONObjectFactory(
    UseNonUndefined(LayoutStyles.DescriptionLayout)
  ),
};
export const EditTitleLayoutStyle = {
  initialBlock: EditJSONObjectFactory(
    UseNonUndefined(LayoutStyles.TitleLayout.initial)
  ),
  animateBlock: EditJSONObjectFactory(
    UseNonUndefined(LayoutStyles.TitleLayout.animate)
  ),
  blocks: EditJSONObjectFactory(UseNonUndefined(LayoutStyles.TitleLayout)),
};
export const EditSubtitleLayoutStyle = {
  initialBlock: EditJSONObjectFactory(
    UseNonUndefined(LayoutStyles.SubtitleLayout.initial)
  ),
  animateBlock: EditJSONObjectFactory(
    UseNonUndefined(LayoutStyles.SubtitleLayout.animate)
  ),
  blocks: EditJSONObjectFactory(UseNonUndefined(LayoutStyles.SubtitleLayout)),
};
export const EditTextareaLayoutStyle = {
  initialBlock: EditJSONObjectFactory(
    UseNonUndefined(LayoutStyles.TextareaLayout.initial)
  ),
  animateBlock: EditJSONObjectFactory(
    UseNonUndefined(LayoutStyles.TextareaLayout.animate)
  ),
  blocks: EditJSONObjectFactory(UseNonUndefined(LayoutStyles.TextareaLayout)),
};
