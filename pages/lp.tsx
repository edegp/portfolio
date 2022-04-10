import Head from "next/head";
// import Typography from "@mui/material/Typography";
import Container from "../components/container";
import Header from "../components/header";
import LPHome from "../components/lp/lp-home";
// import Acheive from "../components/lp/acheive";
// import System from "../components/lp/system";
// import FAQ from "../components/lp/faq";

export default function LP() {
  return (
    <>
      {/* <Meta /> */}
      <Head>
        <title>飲食店でホームページを開設するならanful</title>
      </Head>
      <Container>
        <Header />
        <LPHome />
        {/* <Acheive />
      <System />
      <Plan />
      <FAQ /> */}
      </Container>
    </>
  );
}
