import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { Link as LinkScroll } from "react-scroll";
import * as Scroll from "react-scroll";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import DehazeIcon from "@mui/icons-material/Dehaze";
import Link from "./Link";
import { useUser } from "../utils/useUser";
import logo from "../public/image/logo.jpg";

export default function Header({ Location }) {
  const router = useRouter();
  const { user } = useUser();
  const [navOpen, setNavOpen] = useState(false);
  const headerLogo = useRef<HTMLAnchorElement>(null);
  const onMouseMove = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const X = event.clientX - 80;
    const Y = event.clientY - 60;
    X > -70 || X < 100 || Y > -50 || Y < 80
      ? (headerLogo.current.style.transform = `translate3d(${X}px, ${Y}px, 0)`)
      : (headerLogo.current.style.transform = null);
  });
  const onMouseLeave = () => {
    headerLogo.current.style.transform = null;
  };
  const handleSetActive = useCallback(() => {
    if (process.browser) {
      const container = document.querySelector("#container");
      container.style.opacity = 1;
      setNavOpen(false);
      container.style.scrollSnapType = "none";
      setTimeout(() => {
        container.style.scrollSnapType = "y mandatory";
      }, 950);
    }
  });

  const toggleDrawer = useCallback(() => {
    setNavOpen(!navOpen);
    if (process.browser) {
      const container = document.querySelector("#container");
      navOpen ? (container.style.opacity = 1) : (container.style.opacity = 0.2);
    }
  });

  useEffect(() => {
    window.addEventListener("resize", () => {
      setNavOpen(false);
      document.querySelector("#container").style.opacity = 1;
    });
  });
  const list = (nav) => (
    <Box className="w-screen tablet:w-[70vw] h-full items-center flex z-32">
      <Button
        onClick={toggleDrawer}
        open={navOpen}
        className="items-center  mr-6  fixed top-[calc(4vw-20px)] right-h-w p-8 z-40 mix-blend-difference text-white rounded-full"
      >
        <CloseIcon className="text-2xl" />
      </Button>
      <Grid container className="pl-vw-32">
        <Grid item xs={4}>
          <Typography variant="h2" className="text-lg text-[#afafaf]">
            SNS
          </Typography>
          <List>
            <ListItem className="pl-0 ">
              <Link href="https://qiita.com/edegp" target="_blank">
                <ListItemText className="!text-sm" primary="Qitta" />
              </Link>
            </ListItem>
            <ListItem className="pl-0 ">
              <Link href="https://www.instagram.com/anfulled4/" target="_blank">
                <ListItemText className="!text-sm" primary="Instagram" />
              </Link>
            </ListItem>
            <ListItem className="pl-0 ">
              <Link href="https://note.com/edegp" target="_blank">
                <ListItemText className="!text-sm" primary="Note" />
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
                {router.pathname === "/" ? (
                  <LinkScroll
                    containerId="container"
                    smooth="linear"
                    spy
                    duration={700}
                    delay={200}
                    onClick={handleSetActive}
                    to="about"
                    className="text-white capitalize text-md mr-5 hover:cursor-pointer"
                  >
                    <h2 className="tracking-normal !font-extrabold !text-2xl leading-tight pl-0 text-black no-underline">
                      About
                    </h2>
                  </LinkScroll>
                ) : (
                  <Link
                    href="/#about"
                    className="text-white capitalize text-md mr-5 hover:cursor-pointer"
                  >
                    <h2 className="tracking-normal !font-extrabold !text-2xl !font-G-bold leading-tight pl-0 text-black no-underline">
                      About
                    </h2>
                  </Link>
                )}
              </ListItem>
              <ListItem className="pl-0">
                {router.pathname === "/" ? (
                  <LinkScroll
                    containerId="container"
                    smooth="linear"
                    spy
                    duration={700}
                    delay={200}
                    onClick={handleSetActive}
                    to="whatido"
                    className="text-white capitalize text-md mr-5 hover:cursor-pointer"
                  >
                    <h2 className="tracking-normal !font-extrabold !text-2xl !font-G-bold leading-tight pl-0 text-black no-underline">
                      My History
                    </h2>
                  </LinkScroll>
                ) : (
                  <Link
                    href="/#whatido"
                    className="text-white capitalize text-md mr-5 hover:cursor-pointer"
                  >
                    <h2 className="tracking-normal !font-extrabold !text-2xl !font-G-bold leading-tight pl-0 text-black no-underline">
                      My History
                    </h2>
                  </Link>
                )}
              </ListItem>
              <ListItem className="pl-0">
                {router.pathname === "/posts" ? (
                  <h2
                    className="tracking-normal !font-extrabold !text-2xl !font-G-bold leading-tight pl-0 text-black no-underline"
                    onClick={toggleDrawer}
                  >
                    Blog
                  </h2>
                ) : (
                  <Link
                    href="/posts"
                    className="text-white capitalize text-md mr-5 hover:cursor-pointer"
                  >
                    <h2 className="tracking-normal !font-extrabold !text-2xl !font-G-bold leading-tight pl-0 text-black no-underline">
                      Blog
                    </h2>
                  </Link>
                )}
              </ListItem>
              <ListItem className="pl-0">
                {router.pathname === "/" ? (
                  <LinkScroll
                    containerId="container"
                    smooth="linear"
                    spy
                    duration={800}
                    delay={200}
                    onClick={handleSetActive}
                    to="contact"
                    className="text-white capitalize text-md mr-5 hover:cursor-pointer"
                  >
                    <h2 className="tracking-normal !font-extrabold !text-2xl !font-G-bold leading-tight pl-0 text-black underline">
                      Contact
                    </h2>
                  </LinkScroll>
                ) : (
                  <Link
                    target=""
                    href="/#contact"
                    className="text-white capitalize text-md mr-5 hover:cursor-pointer"
                  >
                    <h2 className="tracking-normal !font-extrabold !text-2xl !font-G-bold leading-tight pl-0 text-black underline">
                      Contact
                    </h2>
                  </Link>
                )}
              </ListItem>
            </List>
          </Grid>
        </Slide>
      </Grid>
    </Box>
  );

  return (
    <header>
      <Box
        className="header-logo flex items-center fixed tablet:top-h-w tablet:left-h-logo 
      mix-blend-difference 
      z-50"
      >
        <Link
          href="/"
          target=""
          ref={headerLogo}
          onClick={() => {
            Scroll.animateScroll.scrollToTop({
              duration: 500,
              smooth: true,
            });
          }}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="hover:brightness-75 pl-10"
        >
          <img alt="logo" src={logo.src} width="100" height="100" />
        </Link>
      </Box>
      {!/^\/subscription.*$/.test(router.pathname) ||
      router.pathname === "/subscription/signin" ||
      router.pathname === "/subscription/signup" ? (
        <>
          <ul className="laptop:flex items-center mr-6 text-lg fixed top-[calc(4vw-5px)] right-h-w px-8 z-40 pb-8 mix-blend-difference hidden">
            <li>
              {router.pathname === "/" ? (
                <LinkScroll
                  containerId="container"
                  smooth="linear"
                  spy
                  duration={700}
                  delay={200}
                  onClick={handleSetActive}
                  to="about"
                  className="text-white capitalize mr-10 hover:cursor-pointer"
                >
                  About
                </LinkScroll>
              ) : (
                <Link
                  href="/#about"
                  className="text-white capitalize mr-10 hover:cursor-pointer"
                >
                  About
                </Link>
              )}
            </li>
            <li>
              {router.pathname === "/" ? (
                <LinkScroll
                  containerId="container"
                  smooth="linear"
                  spy
                  duration={700}
                  delay={200}
                  onClick={handleSetActive}
                  to="whatido"
                  className="text-white capitalize mr-10 hover:cursor-pointer"
                >
                  My History
                </LinkScroll>
              ) : (
                <Link
                  href="/#whatido"
                  className="text-white capitalize mr-10 hover:cursor-pointer"
                >
                  My History
                </Link>
              )}
            </li>
            <li>
              <Link
                className=" capitalize mr-10 hover:cursor-pointer text-white"
                href="/posts"
                target=""
              >
                Blog
              </Link>
            </li>
            <li>
              {Location === "Home" ? (
                <LinkScroll
                  containerId="container"
                  smooth="linear"
                  spy
                  duration={800}
                  delay={200}
                  onClick={handleSetActive}
                  to="contact"
                  className="text-white capitalize mr-10 hover:cursor-pointer"
                >
                  Contact
                </LinkScroll>
              ) : (
                <Link
                  href="/#contact"
                  className="text-white capitalize mr-10 hover:cursor-pointer"
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
        <></>
      )}
    </header>
  );
}
