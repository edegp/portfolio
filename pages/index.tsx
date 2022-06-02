import React, { useEffect, useState } from "react";
import Head from "next/head";
import Container from "../components/container";
import Home from "../components/front-page/home";
import WhatICan from "../components/front-page/whatican";
import Service from "../components/front-page/service";
import About from "../components/front-page/about";
import Contact from "../components/front-page/contact";
import Subscription from "../components/front-page/subscription";
import Header from "../components/header";
import Footer from "../components/Footer";

export default function Index() {
  const [open, setOpen] = useState(false);
  const handleScroll = (event) => {
    const container = event.target ? event.target : event;
    setOpen(false);
    const name = [
      "home",
      "whatido",
      "about",
      "service",
      "subscription",
      "contact",
    ];
    const children = name.map((e) => container.children.namedItem(e));
    const windowHeight = window.innerHeight;
    const adjust = 150;
    children.forEach((child) => {
      const offsetTop = child.getBoundingClientRect().top;
      if (
        offsetTop >= -(adjust || 0) &&
        offsetTop <= windowHeight - (adjust || 0)
      ) {
        child.classList.add("fade");
        container.querySelectorAll(".fade .fadein").forEach((e) => {
          e.classList.add("fadeInDown");
        });
      }
    });
  };
  useEffect(() => {
    handleScroll(document.querySelector("#container"));
  });
  return (
    <>
      <Head>
        <title>anful</title>
      </Head>
      {/* <Header Location="Home" /> */}
      <Container id="container" onScroll={handleScroll}>
        <Home id="home" />
        <WhatICan id="whatido" open={open} setOpen={setOpen} />
        <Service id="service" />
        <About id="about" />
        <Subscription id="subscription" />
        <Contact id="contact" />
      </Container>
    </>
  );
}
