import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { getStripe } from "../utils/stripe-client";
import { PageMeta } from "../types";
import Navbar from "./ui/Navbar";
import Footer from "./ui/Footer";
import Header from "./header";
import { useUser } from "../utils/useUser";
import { ThemeProvider, createTheme } from "@mui/material/styles";

interface Props {
  children: ReactNode;
  meta?: PageMeta;
}

export default function Layout({ children, meta: pageMeta }: Props) {
  const { userDetails } = useUser();
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
      color: {
        main: userDetails?.color,
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
  const router = useRouter();
  const meta = {
    title: "Next.js Subscription Starter",
  };
  return (
    <>
      <Head>
        <title>{meta.title}</title>
      </Head>
      <ThemeProvider theme={theme}>
        <Header />
        <Elements stripe={getStripe()}>
          <main id="skip">{children}</main>
        </Elements>
      </ThemeProvider>
    </>
  );
}
