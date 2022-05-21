import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { getStripe } from "../utils/stripe-client";
import { PageMeta } from "../types";
import Navbar from "./ui/Navbar";
import Footer from "./ui/Footer";
import Header from "./header";

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
