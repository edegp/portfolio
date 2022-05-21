import Document, { Html, Head, Main, NextScript } from "next/document";
import { GA_TRACKING_ID } from "../lib/gtag";
import Hubspot from "../lib/hubspot";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ja" className="h-screen">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
        <Hubspot />
      </Html>
    );
  }
}
