import Image from "next/image"
import { Link as LinkScroll } from "react-scroll"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
import Homepage from "../../public/image/homepage.jpg"
import Code from "../../public/image/code.jpg"

export default function About({ onClick }: { onClick: () => void }) {
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
          <Grid item className="laptop:w-[85%] self-center">
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
              onClick={onClick}
              to="contact"
              className="text-white"
            >
              <Button className="bg-white text-black rounded-full px-vw-32 normal-case whitespace-nowrap hover:bg-white hover:opacity-50 fadein mt-vw-16 laptop:block hidden">
                Contact me!
              </Button>
            </LinkScroll>
          </Grid>
          <Grid
            item
            className="homepage rounded-2xl text-center laptop:col-span-2 place-self-center"
          >
            <Image
              src={Homepage}
              width={360}
              height={200}
              className="rounded-2xl fadein"
              alt="homepage image"
            />
          </Grid>
          <Grid
            item
            className="laptop:text-left text-center w-[85%] mx-auto self-center  laptop:hidden block "
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
            className="code rounded-2xl bg-black laptop:block hidden laptop:col-span-2 fadein self-end justify-self-center"
          >
            <Image
              src={Code}
              width={360}
              height={200}
              className="rounded-2xl object-cover"
              alt="display code in pc"
            />
          </Grid>
        </Grid>
      </Container>
    </section>
  )
}
