import React from "react";
import NextLink from "next/link";
import MuiLink from "@mui/material/Link";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
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

export const Link = React.forwardRef((props, ref) => (
  <NextLink href={props.href || "#"} passHref>
    <ThemeProvider theme={theme}>
      <MuiLink
        target={props.target || "_self"}
        rel="noopener noreferrer"
        ref={ref}
        {...props}
      >
        {props.children}
      </MuiLink>
    </ThemeProvider>
  </NextLink>
));
