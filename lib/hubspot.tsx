import Script from "next/script";

// _app.tsx で読み込む
export default function Hubspot() {
  return (
    <Script
      type="text/javascript"
      id="hs-script-loader"
      async
      defer
      src="//js-na1.hs-scripts.com/22009101.js"
    ></Script>
  );
}
