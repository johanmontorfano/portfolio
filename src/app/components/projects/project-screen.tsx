import { Container } from "montorfano-utils";
import { MontorfanoUtils_ProjectScreen } from "./montorfano-utils";
import { Overquick_ProjectScreen } from "./overquick";

export const ProjectScreen = () => {
  return (
    <Container
      style={{
        width: "100%",
      }}
    >
      <MontorfanoUtils_ProjectScreen />
      <Overquick_ProjectScreen />
    </Container>
  );
};
