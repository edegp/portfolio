import Image from "next/image"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Zoom from "@mui/material/Zoom"
import Container from "@mui/material/Container"
import React, { useRef, useCallback, useEffect, useState } from "react"
import Link from "next/link"
import AI from "../../public/image/ai.jpg"
import Food from "../../public/image/restaurant.jpg"
import Analytics from "../../public/image/analytics.jpg"
import Ecommerce from "../../public/image/e-commerce.png"
import Reserve from "../../public/image/reserve.jpg"
import Marketing from "../../public/image/marketing.jpg"
import WebSite from "../../public/image/website.png"
import throttle from "lodash.throttle"

export default function WhatICan({ open, setOpen }) {
  const popperURL = {
    AI: "https://qiita.com/edegp/",
    Food: "https://cafe-cms-demo.vercel.app/",
    Analytics: "https://edegp.github.io/yuhi/%E9%9D%92%E6%9C%A8%E6%82%A0%E9%A3%9B_%E5%8D%92%E8%AB%96.pdf",
    Ecommerce: "https://taekobread.base.shop",
    WebSite: "https://tutuzi.co.jp/",
    Reserve: "https://qiita.com/edegp/",
    Marketing: "https://note.com/edegp/",
  }
  const popperImage = {
    AI,
    Food,
    Analytics,
    Ecommerce,
    WebSite,
    Reserve,
    Marketing,
  }
  const [popper, setPopper] = React.useState("AI")

  const ref = useRef(null)
  const [disable, setDisable] = useState(true)
  const [count, setCount] = useState(1)
  const intervalRef = useRef(null)
  const onMouseOver = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      setPopper((event.target as HTMLAnchorElement).id)
      setOpen(true)
      setDisable(false)
      ref.current.style.top = `${event.clientY - 100}px`
      ref.current.style.left = `${event.clientX - 100}px`
      if (intervalRef.current !== null) return
      intervalRef.current = setTimeout(() => setOpen(false), 500)
    },
    []
  )
  const handleTouchStart = useCallback(
    (event: React.TouchEvent<HTMLAnchorElement>) => {
      event.preventDefault()
      if (!(event.target as HTMLAnchorElement).id) {
        setCount(1)
        console.log("count and dis %i", count)
        return setDisable(false)
      }
      setCount((prev) => prev + 1)
      console.log("count %i", count)
      const touch = event.touches[0]
      setPopper((event.target as HTMLAnchorElement).id)
      setOpen(true)
      ref.current.style.top = `${touch.clientY - 100}px`
      ref.current.style.left = `${touch.clientX - 100}px`
      if (intervalRef.current !== null) return
      intervalRef.current = setTimeout(() => setOpen(false), 500)
      setTimeout(() => setCount(1), 150)
    },
    []
  )
  // const handleDouble = useCallback(
  //   (event: React.MouseEvent<HTMLAnchorElement>) => {
  //     setDisable(false)
  //   },
  //   []
  // )

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (intervalRef.current === null) return
      clearTimeout(intervalRef.current)
      intervalRef.current = null
      event.currentTarget.style.top = `${event.clientY - 100}px`
      event.currentTarget.style.left = `${event.clientX - 100}px`
      if (intervalRef.current !== null) return
      intervalRef.current = setTimeout(() => setOpen(false), 350)
    },
    []
  )
  useEffect(() => {
    document.addEventListener(
      "scroll",
      throttle(() => setOpen(false), 500)
    )
    return () =>
      document.removeEventListener(
        "scroll",
        throttle(() => setOpen(false), 500)
      )
  }, [open])
  return (
    <>
      <Zoom
        ref={ref}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        className="pbox fixed w-60 h-60 rounded-full z-40"
        in={open}
        timeout={{ enter: 350, exit: 100 }}
      >
        <Link
          href={disable ? "#" : popperURL[popper]}
          className={
            disable ? "pointer-events-none rounded-full" : "rounded-full"
          }
          rel="noreferrer"
          target="_blank"
        >
          <Image
            src={popperImage[popper]}
            width={200}
            height={200}
            className="rounded-full z-50 absolute object-cover"
            alt="pop image"
          />
        </Link>
      </Zoom>
      <section id="whatido" className="bg-black text-white">
        <Container className="container-fluid tablet:pt-vw-28 pt-[10vh] pb-36">
          <Box className="row justify-center items-center text-center flex flex-wrap ">
            <Typography
              variant="h1"
              className="sm: col-10 z-10 !font-extrabold text-3xl tracking-tight leading-tight mb-16 fadein"
            >
              My History
            </Typography>
          </Box>
          <Box className="marquee justify-around text-center text-lg grid grid-cols-3 justify-items-center">
            <Typography
              className="marquee__inner1 text-white !font-extrabold inline-block w-full hover:cursor-pointer"
              id="AI"
              onMouseOver={onMouseOver}
              onTouchStart={handleTouchStart}
            >
              AI
            </Typography>
            <Typography
              id="Food"
              className="marquee__inner2 text-white !font-extrabold w-full hover:cursor-pointer"
              onMouseOver={onMouseOver}
              onTouchStart={handleTouchStart}
            >
              Food
            </Typography>
            <Typography
              id="Ecommerce"
              className="marquee__inner3 text-white !font-extrabold w-full hover:cursor-pointer"
              onMouseOver={onMouseOver}
              onTouchStart={handleTouchStart}
            >
              E-commerce
            </Typography>
            <Link
              id="WebSite"
              href="https://taekobread.base.shop"
              target="_blank"
              className="marquee__inner1 text-white !font-extrabold w-full hover:cursor-pointer"
              onMouseOver={onMouseOver}
              onTouchStart={handleTouchStart}
            >
              WebSite
            </Link>
            <Typography
              id="Reserve"
              className="marquee__inner2 text-white !font-extrabold w-full hover:cursor-pointer"
              onMouseOver={onMouseOver}
              onTouchStart={handleTouchStart}
            >
              Reserve System
            </Typography>
            <Typography
              id="Analytics"
              className="marquee__inner3 text-white !font-extrabold w-full hover:cursor-pointer"
              onMouseOver={onMouseOver}
              onTouchStart={handleTouchStart}
            >
              Analytics
            </Typography>
            <Typography
              id="Marketing"
              className="marquee__inner2 text-white !font-extrabold w-full hover:cursor-pointer"
              onMouseOver={onMouseOver}
              onTouchStart={handleTouchStart}
            >
              Marketing
            </Typography>
          </Box>
        </Container>
      </section>
    </>
  )
}
