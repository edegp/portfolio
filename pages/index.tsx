import React, { useEffect } from "react";
import Head from "next/head";
import Container from "../components/container";
import Meta from "../components/meta";
import Home from "../components/front-page/home";
import WhatICan from "../components/front-page/whatican";
import Service from "../components/front-page/service";
import About from "../components/front-page/about";
import Contact from "../components/front-page/contact";
import Header from "../components/header";

export default function Index() {
  useEffect(() => {
    const container = document.querySelector("#container");
    const handleScroll = () => {
      const name = ["home", "whatido", "about", "service", "contact"];
      const children = name.map((e) => container.children.namedItem(e));
      // const scroll = container.scrollTop;
      const windowHeight = window.innerHeight;
      const adjust = 150;
      // const fadeIn = document.querySelectorAll(".fade .fadein");
      children.forEach((child) => {
        const offsetTop = child.getBoundingClientRect().top;
        if (
          offsetTop >= -(adjust || 0) &&
          offsetTop <= windowHeight - (adjust || 0)
        ) {
          child.classList.add("fade");
          document.querySelectorAll(".fade .fadein").forEach((e) => {
            e.classList.add("fadeInDown");
          });
        }
      });
    };
    container.addEventListener("scroll", handleScroll);
    document.addEventListener("DOMContentLoaded", handleScroll);
    handleScroll();
  });
  return (
    <>
      <Meta />
      <Head>
        <title>anful</title>
      </Head>
      {/* <Header Location="Home" /> */}
      <Container id="container">
        <Home id="home" />
        <WhatICan id="whatido" />
        <Service id="service" />
        <About id="about" />
        <Contact id="contact" />
      </Container>
    </>
  );
}
