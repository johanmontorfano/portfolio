import {
  Container,
  Separe,
  ShareIt,
} from "montorfano-utils";
import { TitleScreen } from "../components/screens/title-screen";
import { AboutScreen } from "../components/screens/about-screen";
import { ProjectScreen } from "../components/projects/project-screen";
import { MessageScreen } from "../components/screens/message-screen";

export const Page = () => {

  return (
    <div id="_">
      <ShareIt
        title="Johan's Portfolio"
        url="https://www.johanmontorfano.com"
      />
      <Container
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TitleScreen />
      </Container>
      <AboutScreen />
      <Separe />
      <ProjectScreen />
      <Separe />
      <MessageScreen />
    </div>
  );
};
