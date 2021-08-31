import { motion } from "framer-motion";
import { Box, Container, JSONToArray, navigate, Text } from "montorfano-utils";
import { useEffect, useState } from "react";
import { GetProjects, ProjectDefinition } from "../../gcp/scripts/get-projects";

export const ProjectScreen = () => {
  //store all the projects
  const [projects, setProjects] = useState<ProjectDefinition[]>([]);

  useEffect(() => {
    //load projects from firebase
    GetProjects().then((snapshot) => setProjects([...JSONToArray(snapshot)]));
  }, []);

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "min-content",
        overflowX: "auto",
      }}
    >
      {projects.map((project) => {
        return (
          <motion.div
            initial={{
              padding: "var(--padding)",
              borderRadius: "var(--border-radius)",
              border:
                "2px solid var(--significative-theme-color-relative-to-palette-reversed)",
              marginLeft: "25px",
              scale: 1,
              willChange: "scale",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              width: "35vw",
              minWidth: "250px",
              maxWidth: "400px",
              height: "50vh",
            }}
            whileHover={{
              scale: 0.95,
              cursor: "pointer",
            }}
            whileTap={{
              scale: 0.94,
            }}
            onClick={() => window.location.assign(project.url)}
          >
            <Text style={{ fontWeight: 600 }}>{project.name}</Text>
            <Text
              style={{ fontSize: "var(--s-tiny-font-size)", textAlign: "left" }}
            >
              {project.description}
            </Text>
            <Text
              style={{ fontSize: "var(--s-tiny-font-size)", color: "gray" }}
            >
              Click to go.
            </Text>
          </motion.div>
        );
      })}
    </Container>
  );
};
