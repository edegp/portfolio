import Head from "next/head"
import { ReactNode } from "react"
import { Elements } from "@stripe/react-stripe-js"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { getStripe } from "../utils/stripe-client"
import Header from "./header"
// import Footer from "./footer";
import { useUser } from "../utils/useUser"
import { initialTheme } from "../pages/_app"

interface Props {
  children: ReactNode
}

declare module "@mui/material/styles" {
  interface Theme {
    color: {
      main: string
    }
  }
  interface PaletteOptions {
    color?: {
      main?: string
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    color?: {
      main?: string
    }
  }
}

export default function Layout({ children }: Props) {
  const { userDetails } = useUser()
  const theme = createTheme(initialTheme, {
    palette: {
      color: {
        main: userDetails?.color,
      },
    },
  })

  const meta = {
    title: "Next.js Subscription Starter",
  }

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
  )
}
