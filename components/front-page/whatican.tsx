import React, { useRef } from "react";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Link } from "../Link";
import AI from "../../public/image/ai.jpg";
import Food from "../../public/image/restaurant.jpg";
import Analytics from "../../public/image/analytics.jpg";
import Ecommerce from "../../public/image/e-commerce.jpg";
import Reserve from "../../public/image/reserve.jpg";
import Marketing from "../../public/image/marketing.jpg";
import WebSite from "../../public/image/website.png";

export default function WhatICan() {
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
  const [open, setOpen] = React.useState(false);
  const ref = useRef();
  const intervalRef = useRef(null);
  const onMouseOver = (event: React.MouseEvent<HTMLAncherElement>) => {
    if (popper !== event.target.id) {
      setPopper(event.target.id);
    }
    setOpen(true);
    ref.current.style.top = `${event.clientY - 150}px`;
    ref.current.style.left = `${event.clientX - 150}px`;
    intervalRef.current = setTimeout(() => {
      setOpen(false);
    }, 1000);
  };

  const onMouseOut = () => {
    intervalRef.current = setTimeout(() => {
      setOpen(false);
    }, 300);
  };

  const handleMouseMovep = (event) => {
    clearInterval(intervalRef.current);
    event.currentTarget.style.top = `${event.clientY - 150}px`;
    event.currentTarget.style.left = `${event.clientX - 150}px`;
  };

  return (
    <>
      <Fade
        ref={ref}
        onMouseMove={handleMouseMovep}
        className="pbox fixed w-60 h-60 rounded-full z-40"
        in={open}
        timeout={{ enter: 350, exit: 100 }}
      >
        <Box>
          <Image
            src={popperImage[popper]}
            width={200}
            height={200}
            objectFit="cover"
            className="rounded-full z-50 absolute"
          />
        </Box>
      </Fade>
      <section id="whatido" className="bg-black text-white">
        <Container className="container-fluid pt-vw-28 pb-36">
          <Box className="row justify-center items-center text-center flex flex-wrap">
            <Typography
              variant="h1"
              className="sm: col-10 z-10 !font-G-bold text-3xl tracking-tight leading-tight mb-16 fadein"
            >
              My History
            </Typography>
          </Box>
          <Grid
            container
            // direction-xs-column
            className="marquee justify-around text-center text-lg"
          >
            <Grid item xs={4} className="marquee__inner1">
              <Link
                href="https://qiita.com/edegp"
                target="_blank"
                className="text-white !font-G-bold inline-block w-full h-full"
                id="AI"
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
              >
                AI
              </Link>
            </Grid>
            <Grid item xs={4} className="marquee__inner2">
              <Link
                id="Food"
                href="https://note.com/edegp"
                target="_blank"
                className="text-white !font-G-bold"
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
              >
                Food
              </Link>
            </Grid>
            <Grid item xs={4} className="marquee__inner3">
              <Link
                id="Ecommerce"
                href="https://qiita.com/edegp"
                target="_blank"
                className="text-white !font-G-bold"
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
              >
                E-commerce
              </Link>
            </Grid>
            <Grid item xs={4} className="marquee__inner1">
              <Link
                id="WebSite"
                href="https://libebar.shop"
                target="_blank"
                className="text-white !font-G-bold"
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
              >
                WebSite
              </Link>
            </Grid>
            <Grid item xs={4} className="marquee__inner2">
              <Link
                id="Reserve"
                href="https://qiita.com/edegp"
                target="_blank"
                className="text-white !font-G-bold"
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
              >
                Reserve System
              </Link>
            </Grid>
            <Grid item xs={4} className="marquee__inner3">
              <Link
                id="Analytics"
                href="https://qiita.com/edegp"
                target="_blank"
                className="text-white !font-G-bold"
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
              >
                Analytics
              </Link>
            </Grid>
            <Grid item xs={4} className="marquee__inner2">
              <Link
                id="Marketing"
                href="https://note.com/edegp"
                target="_blank"
                className="text-white !font-G-bold"
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
              >
                Marketing
              </Link>
            </Grid>
          </Grid>
        </Container>
      </section>
    </>
  );
}
