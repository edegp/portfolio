import { AppProps } from "next/app";
import { useRef, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import {
  GA_ID,
  existsGaId,
  pageview,
  event,
  usePageView,
  GoogleAnalytics,
} from "../lib/gtag";
import { UserProvider } from "@supabase/supabase-auth-helpers/react";
import { MyUserContextProvider } from "../utils/useUser";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import LoadingDots from "../components/ui/LoadingDots";
import Layout from "../components/Layout";
import "../styles/index.scss";

const theme = createTheme({
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
          borderLeft: "1px solid rgba(0, 0, 0, 0.12)!important",
          padding: "10px 25px",
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
});

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
      <GoogleAnalytics />
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </>
  );
}
