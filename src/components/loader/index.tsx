import { motion } from "framer-motion";

export const Loader = () => (
  <div
    style={{
      width: "100%",
      height: "100vh",
      background: "white",
      zIndex: 100,
      color: "black",
      position: "fixed",
      top: 0,
    }}
  >
    <motion.div
      initial={{
        width: "20%",
        height: "5vh",
        background: "black",
        borderRadius: "15px",
        margin: "4vh",
        marginBottom: "8vh",
        opacity: 0.2,
        y: "120%",
      }}
      animate={{
        opacity: 1,
        y: "0%",
        width: "40%",
      }}
      transition={{
        repeat: Infinity,
        repeatDelay: 2,
        duration: 0.5,
      }}
    />
    <motion.div
      initial={{
        width: "20%",
        height: "2vh",
        background: "black",
        borderRadius: "15px",
        margin: "4vh",
        opacity: 0.2,
        y: "120%",
      }}
      animate={{
        opacity: 1,
        y: "0%",
        width: "55%",
      }}
      transition={{
        repeat: Infinity,
        repeatDelay: 2,
        duration: 0.5,
      }}
    />
    <motion.div
      initial={{
        width: "20%",
        height: "2vh",
        background: "black",
        borderRadius: "15px",
        margin: "4vh",
        opacity: 0.2,
        y: "120%",
      }}
      animate={{
        opacity: 1,
        y: "0%",
        width: "70%",
      }}
      transition={{
        repeat: Infinity,
        repeatDelay: 2,
        duration: 0.5,
      }}
    />
    <div style={{ display: "flex" }}>
      <motion.div
        initial={{
          width: "10vh",
          height: "10vh",
          background: "black",
          borderRadius: "15px",
          margin: "4vh",
          opacity: 0.2,
          y: "120%",
        }}
        animate={{
          opacity: 1,
          y: "0%",
        }}
        transition={{
          repeat: Infinity,
          repeatDelay: 2,
          duration: 0.5,
        }}
      />
      <motion.div
        initial={{
          width: "10vh",
          height: "10vh",
          background: "black",
          borderRadius: "15px",
          margin: "4vh",
          opacity: 0.2,
          y: "120%",
        }}
        animate={{
          opacity: 1,
          y: "0%",
        }}
        transition={{
          repeat: Infinity,
          repeatDelay: 2,
          duration: 0.5,
        }}
      />
    </div>
  </div>
);
