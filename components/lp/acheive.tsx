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

export default function Acheive() {
  const lists = [WP, Shopify, CsCart, GA, Next, Contentful, Vercel];
  return (
    <Box className="archive laptop:pt-[14vh] pt-[10vh] section px-vw-20">
      <Typography className="font-bold text-primary text-2xl text-center mb-[10px]">
        多様なサービスの運用実績
      </Typography>
      <Box className="grid laptop:grid-cols-3 container-fluid place-content-center tablet:grid-cols-2 grid-cols-1 tablet:px-4 px-vw-32">
        {lists.map((list) => {
          let CN = "";
          list === Vercel
            ? (CN =
                "tablet:mt-vw-8 laptop:col-span-3 tablet:col-span-2 col-span-1")
            : list === CsCart
            ? (CN = "laptop:my-[-3vw] my-[-4vw] z-[-4]")
            : list === Contentful
            ? (CN = "laptop:my-[-4.5vw] tablet:my-[-8.5vw] my-[-15vw] z-[-5]")
            : list === WP
            ? (CN = "tablet:mt-vw-8 sp:my-[-7px] z-[-3]")
            : list === Next
            ? (CN = "tablet:mt-vw-8 sp:my-[-5vw] z-[-2]")
            : (CN = "tablet:mt-vw-8  z-[-3]");
          return (
            <Box
              className={`mx-auto text-center laptop:w-[28vw] tablet:w-[40vw] w-[50vw] ${CN}`}
            >
              <Image src={list} objectFit={"cover"} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
