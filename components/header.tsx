import { useState, useRef } from "react";
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
import { Link } from "./Link";
import logo from "../public/image/logo.jpg";

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const headerLogo = useRef<HTMLAnchorElement>(null);
  const onMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const X = event.clientX - 80;
    const Y = event.clientY - 60;
    if (X > -70 && X < 100 && Y > -50 && Y < 80) {
      const translate3d = `translate3d(${X}px, ${Y}px, 0)`;
      headerLogo.current.style.transform = translate3d;
    } else {
      headerLogo.current.style.transform = null;
    }
  };
  const onMouseLeave = () => {
    headerLogo.current.style.transform = null;
  };
  const handleSetActive = () => {
    if (process.browser) {
      const container = document.getElementById("container");
      container.style.scrollSnapType = "none";
    }
    setTimeout(() => {
      container.style.scrollSnapType = "y mandatory";
    }, 950);
  };
  const toggleDrawer = () => setNavOpen(!navOpen);

  const list = (nav) => (
    <Box className="w-[70vw] h-full items-center flex">
      <Button
        onClick={toggleDrawer}
        className="items-center  mr-6  fixed top-h-w right-h-w p-8 z-40 mix-blend-difference text-white rounded-full"
      >
        <CloseIcon className="text-3xl" />
      </Button>
      <Grid container className="tablet:pl-vw-20 pl-vw-10">
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
                <LinkScroll
                  containerId="container"
                  smooth="linear"
                  spy
                  duration={700}
                  delay={200}
                  onClick={handleSetActive}
                  to="about"
                  className="text-white"
                >
                  <h2 className="tracking-normal !font-extrabold !text-2xl !font-G-bold leading-tight pl-0 text-black no-underline">
                    About
                  </h2>
                </LinkScroll>
              </ListItem>
              <ListItem className="pl-0">
                <LinkScroll
                  containerId="container"
                  smooth="linear"
                  spy
                  duration={700}
                  delay={200}
                  onClick={handleSetActive}
                  to="whatido"
                  className="text-white"
                >
                  <h2 className="tracking-normal !font-extrabold !text-2xl !font-G-bold leading-tight pl-0 text-black no-underline">
                    My History
                  </h2>
                </LinkScroll>
              </ListItem>
              <ListItem className="pl-0">
                <Link target="" href="/blog">
                  <h2 className="tracking-normal !font-extrabold !text-2xl !font-G-bold leading-tight pl-0 text-black no-underline">
                    Blog
                  </h2>
                </Link>
              </ListItem>
              <ListItem className="pl-0">
                <LinkScroll
                  containerId="container"
                  smooth="linear"
                  spy
                  duration={800}
                  delay={200}
                  onClick={handleSetActive}
                  to="contact"
                  className="text-white"
                >
                  <h2 className="tracking-normal !font-extrabold !text-2xl !font-G-bold leading-tight pl-0 text-black no-underline">
                    Contact
                  </h2>
                </LinkScroll>
              </ListItem>
            </List>
          </Grid>
        </Slide>
      </Grid>
    </Box>
  );

  return (
    <header>
      <Box className="header-logo flex items-center fixed top-h-w left-h-logo mix-blend-difference z-50">
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
          <img
            alt="logo"
            src={logo.src}
            width="100"
            height="100"
            className="mix-blend-difference"
          />
        </Link>
      </Box>
      <ul className="laptop:flex items-center mr-6 text-lg fixed top-h-w right-h-w px-8 z-40 pb-8 mix-blend-difference hidden">
        <li>
          <Button className="capitalize text-md mr-5 text-white">
            <LinkScroll
              containerId="container"
              smooth="linear"
              spy
              duration={700}
              delay={200}
              onClick={handleSetActive}
              to="about"
              className="text-white"
            >
              About
            </LinkScroll>
          </Button>
        </li>
        <li>
          <Button className="capitalize text-md mr-5 text-white">
            <LinkScroll
              containerId="container"
              smooth="linear"
              spy
              duration={700}
              delay={200}
              onClick={handleSetActive}
              to="whatido"
              className="text-white"
            >
              My History
            </LinkScroll>
          </Button>
        </li>
        <li>
          <Button className="capitalize text-md mr-5 text-white">
            <Link className="text-white !font-G-bold" href="/blog" target="">
              Blog
            </Link>
          </Button>
        </li>
        <li>
          <Button className="capitalize text-md text-white">
            <LinkScroll
              containerId="container"
              smooth="linear"
              spy
              duration={800}
              delay={200}
              onClick={handleSetActive}
              to="contact"
              className="text-white"
            >
              Contact
            </LinkScroll>
          </Button>
        </li>
      </ul>
      <Button
        className="laptop:hidden block items-center mr-6  fixed top-h-w right-h-w p-8 z-40 mix-blend-difference text-white rounded-full"
        onClick={toggleDrawer}
      >
        <DehazeIcon />
      </Button>
      <Drawer
        anchor="right"
        open={navOpen}
        onClose={toggleDrawer}
        transitionDuration={500}
      >
        {list(navOpen)}
      </Drawer>
    </header>
  );
}
