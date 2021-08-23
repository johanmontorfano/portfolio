import { motion } from "framer-motion";
import { AspectRatio, Container, Subtitle, Title } from "montorfano-utils";
import { useState } from "react";
import { Subject } from "rxjs";
import { CrossSVG } from "./cross";

type RewardsList =
  | "5minutesonthesite"
  | "clickedonthecircle"
  | "sentamessage"
  | "empty";
type RewardInfo = {
  name: string;
  gif: string;
};

export const RewardsSubject = new Subject<RewardsList>();
const doneRewards: RewardsList[] = [];
const rewardsData: { [entry: string]: RewardInfo } = {
  "5minutesonthesite": {
    name: "You've been here already 5 minutes !",
    gif: "https://media.giphy.com/media/ZdUnQS4AXEl1AERdil/giphy.gif",
  },
  clickedonthecircle: {
    name: "Click again on me... I'm an easter egg 🍳",
    gif: "https://media.giphy.com/media/ZYENqjb4a515zYWgNS/giphy.gif",
  },
  sentamessage: {
    name: "Wow... you sent a message. I will reply soon by email !",
    gif: "https://media.giphy.com/media/XITSlI6EriGDEzw6iL/giphy.gif",
  },
  empty: {
    name: "Ohoh... I'm not ready don't look at me !",
    gif: "https://media.giphy.com/media/25QbQfG72lqiXD2Dpm/giphy.gif",
  },
};

export const RewardInterface = (): JSX.Element => {
  const [isClosed, setIsClosed] = useState<boolean>(true);
  const [lastDidReward, setLastDidReward] = useState<RewardsList>("empty");

  RewardsSubject.subscribe((reward) => {
    if (doneRewards.indexOf(reward) === -1) {
      doneRewards.push(reward);
      setLastDidReward(reward);
      setIsClosed(false);
    }
  });

  return (
    <motion.div
      initial={{
        scale: 0,
        opacity: 0,
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1001,
        transitionDuration: "0.25s",
      }}
      animate={{
        scale: isClosed ? 0 : 1,
        opacity: isClosed ? 0 : 1,
      }}
    >
      <Container
        style={{
          width: "80vw",
          background: "var(--significative-theme-color)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          boxShadow: "var(--box-shadow)",
          borderRadius: 5,
        }}
      >
        <div
          style={{
            width: "95%",
            display: "flex",
            justifyContent: "flex-end",
            paddingTop: "1%",
            cursor: "pointer",
          }}
          onClick={() => setIsClosed(true)}
        >
          <CrossSVG />
        </div>
        <Subtitle style={{ textAlign: "center" }}>
          {rewardsData[lastDidReward].name}
        </Subtitle>
        <img
          src={rewardsData[lastDidReward].gif}
          style={{ width: "50%", maxWidth: "20vw", borderRadius: 5 }}
        />
      </Container>
    </motion.div>
  );
};
