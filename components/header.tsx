import { useState, useRef, useEffect, useCallback } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Link as LinkScroll } from "react-scroll"
import * as Scroll from "react-scroll"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Typography from "@mui/material/Typography"
import Drawer from "@mui/material/Drawer"
import Grid from "@mui/material/Grid"
import Slide from "@mui/material/Slide"
import CloseIcon from "@mui/icons-material/Close"
import DehazeIcon from "@mui/icons-material/Dehaze"
import Image from "next/image"
import Link from "next/link"
import logo from "../public/image/logo.jpg"

export default function Header() {
  const pathname = usePathname()
  console.log(!/^\/subscription.*$/.test(pathname))
  const [navOpen, setNavOpen] = useState(false)
  const headerLogo = useRef<HTMLAnchorElement>(null)
  const onMouseMove = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const X = event.clientX - 80
    const Y = event.clientY - 60
    // eslint-disable-next-line no-unused-expressions
    X > -70 || X < 100 || Y > -50 || Y < 80
      ? (headerLogo.current.style.transform = `translate3d(${X}px, ${Y}px, 0)`)
      : (headerLogo.current.style.transform = null)
  }, [])
  const onMouseLeave = () => {
    headerLogo.current.style.transform = null
  }
  const handleSetActive = useCallback(() => {
    if (process.browser) {
      const container: HTMLElement = document.querySelector("#container")
      container.style.opacity = "1"
      setNavOpen(false)
      container.style.scrollSnapType = "none"
      setTimeout(() => {
        container.style.scrollSnapType = "y mandatory"
      }, 950)
    }
  }, [])

  const toggleDrawer = useCallback(() => {
    setNavOpen(!navOpen)
    if (process.browser) {
      const container: HTMLElement = document.querySelector("#container")
      // eslint-disable-next-line no-unused-expressions
      navOpen
        ? (container.style.opacity = "1")
        : (container.style.opacity = "0.2")
    }
  }, [navOpen])

  useEffect(() => {
    if (window !== undefined) {
      window.addEventListener("resize", () => {
        setNavOpen(false)
        const container: HTMLElement = document.querySelector("#container")
        container.style.opacity = "1"
      })
    }
    return () => {
      window.removeEventListener("resize", () => {
        setNavOpen(false)
        const container: HTMLElement = document.querySelector("#container")
        container.style.opacity = "1"
      })
    }
  }, [])

  const list = (nav) => (
    <Box className="w-screen tablet:w-[70vw] h-full items-center flex z-32">
      <Button
        onClick={toggleDrawer}
        className="items-center  mr-6  fixed top-[calc(4vw-20px)] right-h-w p-8 z-40 mix-blend-difference rounded-full text-white border-white"
      >
        <CloseIcon className="text-2xl text-white" />
      </Button>
      <Grid container className="pl-vw-32">
        <Grid item xs={4}>
          <Typography variant="h2" className="text-lg text-[#afafaf]">
            SNS
          </Typography>
          <List>
            <ListItem className="pl-0 ">
              <Link
                href="https://qiita.com/edegp"
                target="_blank"
                className="!text-sm"
              >
                Qitta
              </Link>
            </ListItem>
            <ListItem className="pl-0 ">
              <Link
                href="https://www.instagram.com/anfulled4/"
                target="_blank"
                className="!text-sm"
              >
                Instagram
              </Link>
            </ListItem>
            <ListItem className="pl-0 ">
              <Link
                href="https://note.com/edegp"
                target="_blank"
                className="!text-sm"
              >
                Note
              </Link>
            </ListItem>
          </List>
        </Grid>
        <Slide
          direction="left"
          in={nav}
          timeout={1000}
          mountOnEnter
          unmountOnExit
        >
          <Grid item xs={8}>
            <Typography variant="h2" className="text-lg text-[#afafaf]">
              Menu
            </Typography>
            <List>
              <ListItem className="pl-0">
                {pathname === "/" ? (
                  <LinkScroll
                    containerId="container"
                    smooth="linear"
                    spy
                    duration={700}
                    delay={200}
                    onClick={handleSetActive}
                    to="about"
                    className=" capitalize mr-5 hover:cursor-pointer"
                  >
                    <h2 className="tracking-normal !font-extrabold !text-2xl leading-tight pl-0 text-black no-underline">
                      About
                    </h2>
                  </LinkScroll>
                ) : (
                  <h2 className="tracking-normal !font-extrabold !text-2xl !font-G-bold leading-tight pl-0 text-black no-underline">
                    <Link
                      href="/#about"
                      className=" capitalize mr-5 hover:cursor-pointer"
                    >
                      About
                    </Link>
                  </h2>
                )}
              </ListItem>
              <ListItem className="pl-0">
                {pathname === "/" ? (
                  <LinkScroll
                    containerId="container"
                    smooth="linear"
                    spy
                    duration={700}
                    delay={200}
                    onClick={handleSetActive}
                    to="whatido"
                    className=" capitalize mr-5 hover:cursor-pointer"
                  >
                    <h2 className="tracking-normal !font-extrabold !text-2xl !font-G-bold leading-tight pl-0 text-black no-underline">
                      My History
                    </h2>
                  </LinkScroll>
                ) : (
                  <h2 className="tracking-normal !font-extrabold !text-2xl !font-G-bold leading-tight pl-0 text-black no-underline">
                    <Link
                      href="/#whatido"
                      className=" capitalize mr-5 hover:cursor-pointer"
                    >
                      My History
                    </Link>
                  </h2>
                )}
              </ListItem>
              <ListItem className="pl-0">
                {pathname === "/posts" ? (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
                  <h2
                    className="tracking-normal !font-extrabold !text-2xl !font-G-bold leading-tight pl-0 text-black no-underline"
                    onClick={toggleDrawer}
                  >
                    Blog
                  </h2>
                ) : (
                  <h2 className="tracking-normal !font-extrabold !text-2xl !font-G-bold leading-tight pl-0 text-black no-underline">
                    <Link
                      href="/posts"
                      className="capitalize mr-5 hover:cursor-pointer"
                    >
                      Blog
                    </Link>
                  </h2>
                )}
              </ListItem>
              <ListItem className="pl-0">
                {pathname === "/" ? (
                  <LinkScroll
                    containerId="container"
                    smooth="linear"
                    spy
                    duration={800}
                    delay={200}
                    onClick={handleSetActive}
                    to="contact"
                    className=" capitalize mr-5 hover:cursor-pointer"
                  >
                    <h2 className="tracking-normal !font-extrabold !text-2xl !font-G-bold leading-tight pl-0 text-black underline">
                      Contact
                    </h2>
                  </LinkScroll>
                ) : (
                  <h2 className="tracking-normal !font-extrabold !text-2xl !font-G-bold leading-tight pl-0 text-black underline">
                    <Link
                      target=""
                      href="/#contact"
                      className=" capitalize mr-5 hover:cursor-pointer"
                    >
                      Contact
                    </Link>
                  </h2>
                )}
              </ListItem>
            </List>
          </Grid>
        </Slide>
      </Grid>
    </Box>
  )

  return (
    <header className="text-white">
      <Box className="header-logo flex items-center fixed tablet:top-h-w tablet:left-h-logo mix-blend-difference z-50">
        <Link
          href="/"
          target=""
          ref={headerLogo}
          onClick={() =>
            Scroll.animateScroll.scrollToTop({
              duration: 500,
              smooth: true,
            })
          }
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="hover:brightness-75 pl-10"
        >
          <Image alt="logo" src={logo.src} width="100" height="100" />
        </Link>
      </Box>
      {!/^\/subscription.*$/.test(pathname) ||
      pathname === "/subscription/signin" ||
      pathname === "/subscription/signup" ? (
        <>
          <ul className="laptop:flex items-center mr-6 text-lg fixed top-[calc(4vw-5px)] right-h-w px-8 z-40 pb-8 mix-blend-difference hidden">
            <li>
              {pathname === "/" ? (
                <LinkScroll
                  containerId="container"
                  smooth="linear"
                  spy
                  duration={700}
                  delay={200}
                  onClick={handleSetActive}
                  to="about"
                  className=" capitalize mr-10 hover:cursor-pointer"
                >
                  About
                </LinkScroll>
              ) : (
                <Link
                  href="/#about"
                  className=" capitalize mr-10 hover:cursor-pointer"
                >
                  About
                </Link>
              )}
            </li>
            <li>
              {pathname === "/" ? (
                <LinkScroll
                  containerId="container"
                  smooth="linear"
                  spy
                  duration={700}
                  delay={200}
                  onClick={handleSetActive}
                  to="whatido"
                  className=" capitalize mr-10 hover:cursor-pointer"
                >
                  My History
                </LinkScroll>
              ) : (
                <Link
                  href="/#whatido"
                  className=" capitalize mr-10 hover:cursor-pointer"
                >
                  My History
                </Link>
              )}
            </li>
            <li>
              <Link
                className=" capitalize mr-10 hover:cursor-pointer "
                href="/posts"
                target=""
              >
                Blog
              </Link>
            </li>
            <li>
              {pathname === "/" ? (
                <LinkScroll
                  containerId="container"
                  smooth="linear"
                  spy
                  duration={800}
                  delay={200}
                  onClick={handleSetActive}
                  to="contact"
                  className=" capitalize mr-10 hover:cursor-pointer"
                >
                  Contact
                </LinkScroll>
              ) : (
                <Link
                  href="/#contact"
                  className=" capitalize mr-10 hover:cursor-pointer"
                >
                  Contact
                </Link>
              )}
            </li>
          </ul>
          <Button
            className="laptop:hidden block items-center mr-6  fixed top-[calc(4vw-5px)] right-h-w p-8 z-20 mix-blend-difference text-white rounded-full"
            onClick={toggleDrawer}
          >
            <DehazeIcon />
          </Button>
          <Drawer
            anchor="right"
            open={navOpen}
            onClose={toggleDrawer}
            transitionDuration={500}
            className="z-30"
          >
            {list(navOpen)}
          </Drawer>
        </>
      ) : (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <></>
      )}
    </header>
  )
}
