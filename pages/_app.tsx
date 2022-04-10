import { useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import "../styles/tailwind.scss";
import "../styles/index.scss";
import "../styles/tailwind-utils.scss";

function MyApp({ Component, pageProps }) {
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
      <Box
        ref={cursor}
        className="cursor mix-blend-exclusion z-50 before:rounded-full"
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
