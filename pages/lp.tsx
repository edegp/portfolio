import { useState } from "react";
import Head from "next/head";
import throttle from "lodash.throttle";
import Container from "../components/container";
import Header from "../components/header";
import LPHome from "../components/lp/lp-home";
import Trouble from "../components/lp/trouble";
import Acheive from "../components/lp/acheive";
import Merit from "../components/lp/merit";
import Merit2 from "../components/lp/merit2";
import System from "../components/lp/system";
import Introduce from "../components/lp/introduce";
import FAQ from "../components/lp/faq";
import { Product } from "../types";
import { GetStaticPropsResult } from "next";
import { getActiveProductsWithPrices } from "../utils/supabase-client";

interface Props {
  products: Product[];
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const products = await getActiveProductsWithPrices();
  return {
    props: {
      products,
    },
    revalidate: 60,
  };
}

export default function LP({ products }: Props) {
  const [checked, setChecked] = useState(false);
  const handleChange = () => setChecked((prev) => !prev);
  const handleScroll = throttle((e) => {
    e.target.scrollTop > 800 && e.target.scrollTop < 1000
      ? handleChange()
      : checked ?? setChecked(false);
  }, 400);
  return (
    <>
      <Head>
        <title>飲食店でホームページを開設するならANful</title>
      </Head>
      <Container onScroll={handleScroll}>
        <LPHome />
        <Trouble checked={checked} />
        <Merit />

        <Acheive />
        <Merit2 />
        <System />
        <Introduce products={products} />
        <FAQ />
      </Container>
    </>
  );
}
