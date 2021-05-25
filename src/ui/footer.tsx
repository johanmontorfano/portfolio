import { Container } from "./container";
import { Text } from "./text";
import { Box } from "./box";
import { Grid } from "./grid";
import { Link } from "./link";
import { Separe } from "./separe";

//link list are regrouped by columns
//a column is an element in the main array
//the name of a column is defined in the column[x].name => string property
//the links of a column are defined in the column[x].entries => array[] property
export const Footer = (props: {
  columns: { name: string; entries: { name: string; path: string }[] }[];
}) => {
  return (
    <Container
      width={"100%"}
      height={"auto"}
      style={{
        background: "var(--significative-theme-color-relative-to-palette)",
        display: "block",
        borderTop:
          "1px solid var(--significative-theme-color-relative-to-palette)",
        boxShadow: "var(--box-shadow-relative-to-palette)"
      }}
    >
      <Box x="100%" y="100%">
        <Grid
          rows={1}
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(100px, 300px))",
            gridAutoRows: "auto",
            padding: "var(--padding)",
          }}
        >
          {props.columns.map((column) => (
            <ul>
              <Text style={{ fontSize: "var(--tiny-font-size)" }}>
                {column.name}
              </Text>
              <br />
              <Grid rows={column.entries.length}>
                {column.entries.map((entry) => (
                  <li style={{ listStyle: "none" }}>
                    <Link
                      style={{
                        fontSize: "var(--s-tiny-font-size)",
                        width: "min-content",
                        whiteSpace: "nowrap",
                      }}
                      to={entry.path}
                    >
                      {entry.name}
                    </Link>
                  </li>
                ))}
              </Grid>
            </ul>
          ))}
        </Grid>
      </Box>
      <br />
      <Box x="100%" y="100%">
        <Text style={{ color: "gray", textAlign: "center", fontSize: "25px" }}>
          Johan Montorfano
        </Text>
        <Text
          style={{
            color: "gray",
            textAlign: "center",
            fontSize: "25px",
          }}
        >
          © 2021
        </Text>
      </Box>
      <br />
    </Container>
  );
};
