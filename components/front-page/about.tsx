import Image from "next/image";
import { Link as LinkScroll } from "react-scroll";
import * as Scroll from "react-scroll";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Link from "../Link";
import Homepage from "../../public/image/homepage.jpg";
import Code from "../../public/image/code.jpg";

export default function About() {
  return (
    <section id="about" className=" bg-black text-white">
      <Container
        className="pt-[15vh] tablet:pt-vw-32 pb-vw-24 px-vw-40 desktop:px-0
       "
      >
        <Grid
          container
          className="grid 

        laptop:grid-rows-[30vh,35vh]
        grid-flow-col
        grid-rows-[17vh,1fr,32vh,5vh]
        gap-y-0
        tablet:gap-y-6
        laptop:gap-y-2
        "
        >
          <Grid
            item
            variant="h2"
            className="laptop:w-[85%] 
          self-center
          "
          >
            <Typography
              variant="h2"
              className="text-lg font-bold laptop:text-left text-center max-h-vw-20 fadein"
            >
              小規模な飲食店に、 <br />
              手軽なホームページを。
            </Typography>
          </Grid>
          <Grid item className="laptop:w-[85%] pl-vw-10 laptop:pl-0 ">
            <Typography variant="body1" className="text-sm fadein">
              アンフルでは個人経営の飲食店向けに、手軽で価値のあるホームページを提供しています。
              <br className="tablet:block hidden" />
              ネットでの集客が年々難しくなっている中で、アンフルのホームページでは、効率的に集客をしつつ、お客様の手間を最小限に抑えることが可能です。
            </Typography>
            <LinkScroll
              containerId="container"
              smooth="linear"
              spy
              duration={800}
              delay={200}
              onClick={() => {
                if (process.browser) {
                  const container = document.getElementById("container");
                  container.style.scrollSnapType = "none";
                }
                setTimeout(() => {
                  container.style.scrollSnapType = "y mandatory";
                }, 950);
              }}
              to="contact"
              className="text-white"
            >
              <Button className="bg-white text-black rounded-full px-vw-32 normal-case whitespace-nowrap hover:bg-white hover:opacity-50 fadein mt-vw-16 laptop:block hidden">
                <Link
                  href="#contact"
                  target="_blank"
                  className="!font-extrabold"
                >
                  Contact me!
                </Link>
              </Button>
            </LinkScroll>
          </Grid>
          <Grid
            item
            className="homepage rounded-2xl self-center text-center laptop:col-span-2"
          >
            <Image
              src={Homepage}
              width={480}
              height={269}
              className="rounded-2xl fadein"
            />
          </Grid>
          <Grid
            item
            className=" 
            laptop:text-left text-center w-[85%] mx-auto self-center  laptop:hidden block"
          >

            <Button
              className="bg-white text-black rounded-full px-vw-32 normal-case whitespace-nowrap hover:bg-white hover:opacity-50 fadein"
              href="#contact"
            >
              Contact me!
            </Button>
            {/* </LinkScroll> */}
          </Grid>
          <Grid
            item
            className="code rounded-2xl bg-black laptop:block hidden laptop:col-span-2 fadein"
          >
            <Image
              src={Code}
              width={480}
              height={269}
              className="rounded-2xl"
            />
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}
