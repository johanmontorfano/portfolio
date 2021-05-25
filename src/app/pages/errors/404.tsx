import { Container } from "../../../ui/container";
import { Title } from "../../../ui/title";
import { Subtitle } from "../../../ui/subtitle";
import { Link } from "../../../ui/link";
import { Appear } from "../../../ui/appear";

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
