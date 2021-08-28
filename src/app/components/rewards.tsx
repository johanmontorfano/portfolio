import { motion } from "framer-motion";
import { Appear, Notification } from "montorfano-utils";
import { useEffect, useState } from "react";
import { Subject } from "rxjs";

type RewardsList =
  | "5minutesonthesite"
  | "clickedonthecircle"
  | "sentamessage"
  | "empty";
type RewardInfo = {
  name: string;
  text: string;
  gif: string;
};

export const RewardsSubject = new Subject<RewardsList>();
const doneRewards: RewardsList[] = [];
const rewardsData: { [entry: string]: RewardInfo } = {
  "5minutesonthesite": {
    name: "You've been here already 5 minutes !",
    text: "No one did this before.",
    gif: "https://media.giphy.com/media/ZdUnQS4AXEl1AERdil/giphy.gif",
  },
  clickedonthecircle: {
    name: "You seems insightful :)",
    text: "You just found an easter egg.",
    gif: "https://media.giphy.com/media/ZYENqjb4a515zYWgNS/giphy.gif",
  },
  sentamessage: {
    name: "Wow... you sent a message.",
    text: "I'm sure i'm gonna wake up sooner and answer.",
    gif: "https://media.giphy.com/media/XITSlI6EriGDEzw6iL/giphy.gif",
  },
  empty: {
    name: "Ohoh... I'm not ready don't look at me !",
    text: "You shouldn't see that.",
    gif: "https://media.giphy.com/media/25QbQfG72lqiXD2Dpm/giphy.gif",
  },
};

export const RewardInterface = (): JSX.Element => {
  const [isClosed, setIsClosed] = useState<boolean>(true);
  const [lastDidReward, setLastDidReward] = useState<RewardsList>("empty");

  useEffect(() => {
    RewardsSubject.subscribe((reward) => {
      if (doneRewards.indexOf(reward) === -1) {
        doneRewards.push(reward);
        setLastDidReward(reward);
        setIsClosed(false);
      }
    });

    return function cleanup() {
      RewardsSubject.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isClosed) {
      setTimeout(() => {
        setIsClosed(true);
      }, 5000);
    }
  }, [isClosed]);

  return (
    <motion.div
      initial={{
        opacity: 0,
        width: "98vw",
        height: "calc(100vh - 2vw)",
        position: "absolute",
        top: 0,
        padding: "1vw",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        willChange: "opacity",
      }}
      animate={{
        opacity: isClosed ? 0 : 1,
      }}
    >
      <Notification
        title={rewardsData[lastDidReward].name}
        description={rewardsData[lastDidReward].text}
        associatedImageURL={rewardsData[lastDidReward].gif}
      />
    </motion.div>
  );
};
