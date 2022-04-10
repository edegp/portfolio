import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Link } from "../Link";
import Serviceimg from "../../public/image/website.png";

export default function Service() {
  return (
    <section id="service" className="text-center">
      <Container
        className="pt-[15vh] tablet:pb-vw-8 
          pb-60 
       "
      >
        <Typography
          variant="h2"
          className="font-Noto-Sans font-bold text-xl 
            laptop:!mb-0 
            tablet:mb-vw-20
            mb-16
            mx-auto fadein"
        >
          お客様を最優先に価値を創造することを理念として、サービスを提供しています。
        </Typography>
        <Box className="rounded-xl mx-auto tablet:w-[80%]">
          <Link
            className="service-img fadein"
            href="https://libebar.shop"
            target="_blank"
          >
            <img
              src={Serviceimg.src}
              width={1200}
              height={555}
              className="rounded-xl  border-[#a1aec0] border-[1px] border-solid
              max-w-none
              w-[120%]
              ml-[-10%]
              tablet:w-full
              tablet:ml-0
              "
              alt="サービスイメージ画像"
            />
          </Link>
          <Typography
            variant="h2"
            className="font-Noto-Sans text-xs mx-auto     laptop:mt-vw-5
                tablet:mt-vw-20
                mt-20
                fadein
                "
          >
            <Link href="https://libebar.shop" target="_blank">
              libebar@新潟白根
            </Link>
          </Typography>
        </Box>
      </Container>
    </section>
  );
}
