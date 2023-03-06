import type { AppProps } from "next/app"
import { useRef, useEffect } from "react"
import Head from "next/head"
import CookieConsent from "react-cookie-consent"
import { deepmerge } from "@mui/utils"
import { UserProvider } from "@supabase/supabase-auth-helpers/react"
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Meta from "../components/meta"
import { usePageView, GoogleAnalytics } from "../lib/gtag"
import { MyUserContextProvider } from "../utils/useUser"
import Layout from "../components/Layout"
import "../styles/index.scss"

export const initialTheme = createTheme({
  palette: {
    primary: {
      light: "#eedf39",
      main: "#04ac4d",
      dark: "#027835",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#ead808",
      dark: "#a39705",
      contrastText: "#fff",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: `"Gilroy-light", "Noto Sans JP"`,
          fontSize: "unset",
          fontWeight: "unset",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "black",
          textDecoration: "none !important",
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          "borderLeft": "1px solid rgba(0, 0, 0, 0.12)!important",
          "padding": "10px 25px",
          "&.Mui-selected": {
            borderColor: "black",
            borderLeft: "1px solid black !important",
            backgroundColor: "white",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "rgba(230, 230, 230, 0.08)",
          },
        },
      },
    },
  },
})

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
      <UserProvider supabaseClient={supabaseClient}>
        <MyUserContextProvider supabaseClient={supabaseClient}>
          <ThemeProvider
            theme={createTheme(deepmerge(initialTheme, initialTheme))}
          >
            <Layout>
              <div
                ref={cursor}
                className="cursor mix-blend-exclusion z-50 before:rounded-full hidden laptop:block"
              />
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
          </ThemeProvider>
        </MyUserContextProvider>
      </UserProvider>
    </>
  )
}
