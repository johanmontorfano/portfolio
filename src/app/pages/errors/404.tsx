import { Container, Appear, Title, Link, Subtitle } from "montorfano-utils";

export const Error404 = () => (
  <Container width="100%" height="100vh" xalign="center" yalign="center">
    <div>
      <Appear delay={0.4}>
        <Title style={{ textAlign: "center" }}>
          404 Error
        </Title>
      </Appear>
      <Appear delay={0.8}>
        <Link to="/">
          <Subtitle style={{ textAlign: "center" }}>Go home</Subtitle>
        </Link>
      </Appear>
    </div>
  </Container>
);
