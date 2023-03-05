import React, { useEffect, useState } from "react"
import Head from "next/head"
import Container from "../components/container"
import Home from "../components/front-page/home"
import WhatICan from "../components/front-page/whatican"
import Service from "../components/front-page/service"
import About from "../components/front-page/about"
import Contact from "../components/front-page/contact"
import Subscription from "../components/front-page/subscription"

export default function Index() {
  const [open, setOpen] = useState(false)
  const handleScroll = (e) => {
    const container = e
    if (!open) setOpen(false)
    const ids = [
      "home",
      "whatido",
      "about",
      "service",
      "subscription",
      "contact",
    ]
    const children = ids.map((name) => container.children.namedItem(name))
    const windowHeight = window.innerHeight
    const adjust = 150
    children.forEach((child) => {
      const offsetTop = child.getBoundingClientRect().top
      if (
        offsetTop >= -(adjust || 0) &&
        offsetTop <= windowHeight - (adjust || 0)
      ) {
        child.classList.add("fade")
        container.querySelectorAll(".fade .fadein").forEach((comp) => {
          comp.classList.add("fadeInDown")
        })
      }
    })
  }
  useEffect(() => {
    handleScroll(document.querySelector("#container"))
  })
  return (
    <>
      <Head>
        <title>anful</title>
      </Head>
      <Container id="container" onScroll={handleScroll}>
        <Home />
        <WhatICan open={open} setOpen={setOpen} />
        <Service />
        <About />
        <Subscription />
        <Contact />
      </Container>
    </>
  )
}
