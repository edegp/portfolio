import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode } from "react";

import Navbar from "./ui/Navbar";
import Footer from "./ui/Footer";
import { PageMeta } from "../types";
import Header from "./header";

import { Elements } from "@stripe/react-stripe-js";
import { getStripe } from "../utils/stripe-client";

interface Props {
  children: ReactNode;
  meta?: PageMeta;
}

export default function Layout({ children, meta: pageMeta }: Props) {
  const router = useRouter();
  const meta = {
    title: "Next.js Subscription Starter",
  };
  return (
    <>
      <Head>
        <title>{meta.title}</title>
      </Head>
      <Header />
      <Elements stripe={getStripe()}>
        <main id="skip">{children}</main>
      </Elements>
    </>
  );
}
