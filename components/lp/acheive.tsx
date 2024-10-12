import Image from "next/image";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import WP from "../../public/image/WP.jpg";
import Shopify from "../../public/image/Shopify.jpg";
import CsCart from "../../public/image/CsCart.jpg";
import GA from "../../public/image/GA.jpg";
import Contentful from "../../public/image/Contentful.jpg";
import Next from "../../public/image/Next.jpg";
import Vercel from "../../public/image/Vercel.jpg";
import BASE from "../../public/image/BASE.png";

export default function Acheive() {
  const lists = [WP, Shopify, BASE, GA, Next, Contentful, Vercel];
  return (
    <Box className="archive pt-[14vh] section px-vw-20">
      <Typography className="font-bold text-primary text-2xl text-center mb-[10px]">
        多様なサービスの運用実績
      </Typography>
      <Box className="grid laptop:grid-cols-3 container-fluid place-content-center tablet:grid-cols-2 grid-cols-1 tablet:px-4 px-vw-32">
        {lists.map((list) => {
          let CN = "";
          list === Vercel
            ? (CN =
                "laptop:w-[24vw] tablet:w-[30vw] w-[40vw] tablet:mt-vw-8 laptop:col-span-3 tablet:col-span-2 col-span-1")
            : list === GA
            ? (CN = "laptop:w-[33vw] w-[45vw]  z-[-4]")
            : list === BASE
            ? (CN = "laptop:w-[20vw] tablet:w-[28vw] w-[35vw] z-[20]")
            : list === Contentful
            ? (CN =
                "laptop:w-[20vw] tablet:w-[30vw] w-[40vw] laptop:my-[-4.5vw] tablet:my-[-8.5vw] my-[-10vw] z-[-5]")
            : list === WP
            ? (CN =
                "laptop:w-[25vw] tablet:w-[35vw] w-[45vw] tablet:mt-vw-8 z-[-3]")
            : list === Next
            ? (CN =
                "laptop:w-[15vw] tablet:w-[18vw] w-[30vw] tablet:mt-vw-4 sp:my-[-3vw] z-[-2]")
            : (CN =
                "laptop:w-[20vw] tablet:w-[30vw] w-[40vw] tablet:mt-vw-8  z-[-3]");
          return (
            <Box className={`mx-auto text-center ${CN}`}>
              <Image src={list} objectFit={"cover"} alt="brand asset"/>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
