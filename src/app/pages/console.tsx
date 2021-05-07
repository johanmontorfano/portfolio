import { motion } from "framer-motion";
import { useState } from "react";
import { useHistory } from "react-router";
import { GetClassnameValue } from "../../app/styles/styled";
import { MultiScriptyAppear } from "../../components/appear";

export const Console = () => {
  const RouterHistory = useHistory();

  const [consoleData, setConsoleData] = useState<string[]>([
    "agent > Hello, use 'help' to see available commands.",
  ]);
  const [command, setCommand] = useState<string>("");
  //[string, string] string1: command name string2: command callback
  const [commandList] = useState<[string, (command: string) => void][]>([
    [
      "help",
      () => {
        const lines = [
          "---- Help ----",
          "home => go on graphical interface",
          "cv => redirect you to the cv page",
          "download <doc> => let you download a specified document, use 'download help' to see which docs can be printed",
          "clear => clear the console",
        ];

        lines.forEach((line) => pushLine(line));
      },
    ],
    [
      "home",
      () => {
        pushLine("router > going on graphical interface...");
        RouterHistory.push("/");
      },
    ],
    [
      "cv",
      () => {
        pushLine("router > going on graphical interface /cv...");
        RouterHistory.push("/cv");
      },
    ],
    [
      "clear",
      () => {
        setConsoleData(["console > cleared !"]);
      }
    ]
  ]);

  const pushCommand = () => {
    pushLine("user > " + command);

    commandList.forEach((element) => {
      if (element[0] === command.split(" ")[0]) element[1](command);
    });
    setCommand("");
  };
  const pushLine = (line: string) =>
    setConsoleData((...prev) => [...prev[0], line]);

  return (
    <motion.div
      initial={{
        width: "100%",
        height: "100vh",
        zIndex: 1000,
        backgroundColor: "blue",
        color: "white",
        fontFamily: "Helvetica",
        fontSize: GetClassnameValue("normal-font-size-current"),
        fontWeight: parseInt(GetClassnameValue("bold-font-weight")),
      }}
    >
      <div
        style={{
          backgroundColor: "whitesmoke",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ backgroundColor: "blue", color: "whitesmoke" }}>
          console
        </div>
      </div>
      <br />
      <MultiScriptyAppear texts={consoleData} />
      <div style={{ position: "absolute", bottom: 0, width: "100%" }}>
        <motion.form
          onSubmit={(e) => {
            pushCommand();
            e.preventDefault();
          }}
        >
          <motion.input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            autoFocus={true}
            initial={{
              height: "2%",
              width: "99%",
              fontSize: GetClassnameValue("normal-font-size-current"),
              color: "white",
              backgroundColor: "blue",
              fontWeight: parseInt(GetClassnameValue("bold-font-weight")),
              border: "none",
              outline: "none",
              borderTop: "1px solid white",
              borderRadius: "none",
            }}
          />
        </motion.form>
      </div>
      {/* glitchy effect */}
      <motion.div
        initial={{
          position: "absolute",
          width: "100%",
          bottom: "-5vh",
          height: "1%",
          backgroundColor: "rgba(0,0,0,0.7)",
          boxShadow: "0px 0px 20px 20px rgba(0,0,0,0.7)",
        }}
        animate={{ bottom: "105vh" }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          bounce: 0,
        }}
      />
    </motion.div>
  );
};
