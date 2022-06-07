import Head from "next/head";
import Container from "../components/container";
import Header from "../components/header";
import LPHome from "../components/lp/lp-home";
import Acheive from "../components/lp/acheive";
import Merit from "../components/lp/merit";
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
  };
}

export default function LP({ products }: Props) {
  return (
    <>
      <Head>
        <title>飲食店でホームページを開設するならANful</title>
      </Head>
      <Container>
        <LPHome />
        <Merit />
        <Acheive />
        <System />
        <Introduce products={products} />
        <FAQ />
      </Container>
    </>
  );
}
