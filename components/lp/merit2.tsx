import Image from "next/image";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "../Link";
import reader from "../../public/image/reader.webp";

export default function Merit2() {
  return (
    <Box className="merit  laptop:pt-[14vh] pt-[5vh] section">
      <Typography className="font-bold text-primary text-2xl text-center laptop:mb-vw-5 mb-0">
        キャッシュレス決済を無料で導入
      </Typography>
      <Typography className="font-medium text-sm text-center mb-vw-6 px-vw-24">
        <span className="tablet:block hidden whitespace-nowrap">
          なんとプレミアムプランにご契約の方なら
        </span>
        通常 7,980円する決済端末が
        <span className="tablet:block hidden">永久無料</span>
      </Typography>
      <Box>
        <Container className="flex flex-wrap">
          <Typography className="font-medium text-sm text-center mb-vw-6 px-vw-24 self-center mx-auto">
            <Link
              href="https://squareup.com/jp/ja/hardware/reader"
              target="_blank"
            >
              Square リーダー
            </Link>
          </Typography>
          <Box>
            <Image src={reader} />
          </Box>
          <Typography className="text-xs ml-auto mt-3">
            ※決済時に決済手数料は
            <Link href="https://squareup.com" target="_blank">
              別途
            </Link>
            お支払いいただく必要があります
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
