import Head from "next/head";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Terms from "../components/terms";

export default function Term() {
  return (
    <>
      <Head>
        <title>利用規約</title>
      </Head>
      <Box className="system laptop:py-[15vh] py-[9vh] section font-[Yu Mincho]">
        <Container>
          <Terms />
        </Container>
      </Box>
    </>
  );
}
