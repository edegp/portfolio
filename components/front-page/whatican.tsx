import React, { useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Zoom from "@mui/material/Zoom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "../Link";
import AI from "../../public/image/ai.jpg";
import Food from "../../public/image/restaurant.jpg";
import Analytics from "../../public/image/analytics.jpg";
import Ecommerce from "../../public/image/e-commerce.jpg";
import Reserve from "../../public/image/reserve.jpg";
import Marketing from "../../public/image/marketing.jpg";
import WebSite from "../../public/image/website.png";

export default function WhatICan({ open, setOpen }) {
  const popperURL = {
    AI: "https://qiita.com/edegp/",
    Food: "https://note.com/edegp/",
    Analytics: "https://qiita.com/edegp/",
    Ecommerce: "https://qiita.com/edegp/",
    WebSite: "https://libebar.shop",
    Reserve: "https://qiita.com/edegp/",
    Marketing: "https://note.com/edegp/",
  };
  const popperImage = {
    AI,
    Food,
    Analytics,
    Ecommerce,
    WebSite,
    Reserve,
    Marketing,
  };
  const [popper, setPopper] = React.useState("AI");

  const ref = useRef();
  const intervalRef = useRef(null);
  const onMouseOver = useCallback(
    (event: React.MouseEvent<HTMLAncherElement>) => {
      setPopper(event.target.id);
      setOpen(true);
      ref.current.style.top = `${event.clientY - 100}px`;
      ref.current.style.left = `${event.clientX - 100}px`;
      if (intervalRef.current !== null) return;
      intervalRef.current = setTimeout(() => setOpen(false), 500);
    },
    []
  );
  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (intervalRef.current === null) return;
      clearTimeout(intervalRef.current);
      intervalRef.current = null;
      event.currentTarget.style.top = `${event.clientY - 100}px`;
      event.currentTarget.style.left = `${event.clientX - 100}px`;
      if (intervalRef.current !== null) return;
      intervalRef.current = setTimeout(() => setOpen(false), 350);
    },
    []
  );
  return (
    <>
      <Zoom
        ref={ref}
        onMouseMove={handleMouseMove}
        className="pbox fixed w-60 h-60 rounded-full z-40"
        in={open}
        timeout={{ enter: 350, exit: 100 }}
      >
        <Link href={popperURL[popper]} target="">
          <Image
            src={popperImage[popper]}
            width={200}
            height={200}
            objectFit="cover"
            className="rounded-full z-50 absolute"
          />
        </Link>
      </Zoom>
      <section id="whatido" className="bg-black text-white">
        <Container className="container-fluid tablet:pt-vw-28 pt-[10vh] pb-36">
          <Box className="row justify-center items-center text-center flex flex-wrap">
            <Typography
              variant="h1"
              className="sm: col-10 z-10 !font-extrabold text-3xl tracking-tight leading-tight mb-16 fadein"
            >
              My History
            </Typography>
          </Box>
          <Box className="marquee justify-around text-center text-lg grid grid-cols-3 justify-items-center">
            <Typography
              className="marquee__inner1 text-white !font-extrabold inline-block w-full"
              id="AI"
              onMouseOver={onMouseOver}
            >
              AI
            </Typography>
            <Typography
              id="Food"
              className="marquee__inner2 text-white !font-extrabold w-full"
              onMouseOver={onMouseOver}
            >
              Food
            </Typography>
            <Typography
              id="Ecommerce"
              className="marquee__inner3 text-white !font-extrabold w-full"
              onMouseOver={onMouseOver}
            >
              E-commerce
            </Typography>
            <Typography
              id="WebSite"
              href="https://libebar.shop"
              target="_blank"
              className="marquee__inner1 text-white !font-extrabold w-full"
              onMouseOver={onMouseOver}
            >
              WebSite
            </Typography>
            <Typography
              id="Reserve"
              className="marquee__inner2 text-white !font-extrabold w-full"
              onMouseOver={onMouseOver}
            >
              Reserve System
            </Typography>
            <Typography
              id="Analytics"
              className="marquee__inner3 text-white !font-extrabold w-full"
              onMouseOver={onMouseOver}
            >
              Analytics
            </Typography>
            <Typography
              id="Marketing"
              className="marquee__inner2 text-white !font-extrabold w-full"
              onMouseOver={onMouseOver}
            >
              Marketing
            </Typography>
          </Box>
        </Container>
      </section>
    </>
  );
}
