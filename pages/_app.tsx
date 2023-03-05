import { AppProps } from "next/app"
import { useRef, useEffect } from "react"
import Head from "next/head"
import CookieConsent from "react-cookie-consent"
import Box from "@mui/material/Box"
import { UserProvider } from "@supabase/supabase-auth-helpers/react"
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs"
import Meta from "../components/meta"
import { usePageView, GoogleAnalytics } from "../lib/gtag"
import { MyUserContextProvider } from "../utils/useUser"
import Layout from "../components/Layout"
import "../styles/index.scss"

export default function MyApp({ Component, pageProps }: AppProps) {
  usePageView() // 追加
  const cursor = useRef<HTMLDivElement>()
  const handleMouseMove = (event) => {
    if (cursor.current) {
      cursor.current.style.top = `${event.clientY - 20}px`
      cursor.current.style.left = `${event.clientX - 20}px`
    }
  }
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove)
  })
  return (
    <>
      <Meta />
      <Head>
        <GoogleAnalytics />
      </Head>
      {/* <ThemeProvider theme={theme}> */}
      <Box
        ref={cursor}
        className="cursor mix-blend-exclusion z-50 before:rounded-full hidden laptop:block"
      />
      <UserProvider supabaseClient={supabaseClient}>
        <MyUserContextProvider supabaseClient={supabaseClient}>
          <Layout>
            <Component {...pageProps} />
            <CookieConsent
              enableDeclineButton
              buttonText="許可する"
              declineButtonText="使用しない"
              buttonClasses=" bg-primary text-white"
              declineButtonClasses="bg-black"
              onAccept={() =>
                window.gtag("consent", "update", {
                  ad_storage: "denied",
                  analytics_storage: "denied",
                })
              }
            >
              このウェブサイトではCookieを利用して、お客様により良い体験を提供しています。このウェブサイトでのCookieの使用を許可しますか？
            </CookieConsent>
          </Layout>
        </MyUserContextProvider>
      </UserProvider>
    </>
  )
}
