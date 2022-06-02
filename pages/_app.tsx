import { AppProps } from "next/app";
import { useRef, useEffect } from "react";
import Head from "next/head";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "../components/container";
import Meta from "../components/meta";
import {
  GA_ID,
  existsGaId,
  pageview,
  event,
  usePageView,
  GoogleAnalytics,
} from "../lib/gtag";
import { UserProvider } from "@supabase/supabase-auth-helpers/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { MyUserContextProvider, useUser } from "../utils/useUser";
import LoadingDots from "../components/ui/LoadingDots";
import Layout from "../components/Layout";
import "../styles/index.scss";

export default function MyApp({ Component, pageProps }: AppProps) {
  usePageView(); // 追加
  const cursor = useRef();
  const handleMouseMove = (event) => {
    cursor.current.style.top = `${event.clientY - 20}px`;
    cursor.current.style.left = `${event.clientX - 20}px`;
  };
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
  });
  return (
    <>
      <Meta />
      <Head>
        <GoogleAnalytics />
      </Head>
      {/* <ThemeProvider theme={theme}> */}
      <Box
        ref={cursor}
        className="cursor mix-blend-exclusion z-50 before:rounded-full hidden tablet:block"
      />
      <UserProvider supabaseClient={supabaseClient}>
        <MyUserContextProvider supabaseClient={supabaseClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MyUserContextProvider>
      </UserProvider>
      {/* </ThemeProvider> */}
    </>
  );
}
