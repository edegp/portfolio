import Image from "next/image";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Schedule from "../../public/image/Schedule.jpg";
import Speedy from "../../public/image/Speedy.jpg";
import Auto from "../../public/image/Auto.jpg";

export default function System() {
  const lists = [
    {
      img: Schedule,
      dd: (
        <>
          <span className="text-primary underline decoration-secondary underline-offset-4 decoration-4">
            予約情報をスマホ
          </span>
          で一括管理
        </>
      ),
    },
    {
      img: Speedy,
      dd: (
        <>
          SNSの投稿で
          <span className="text-primary underline decoration-secondary underline-offset-4 decoration-4">
            ブログを自動更新
          </span>
        </>
      ),
    },
    {
      img: Auto,
      dd: (
        <>
          <span className="text-primary">新技術</span>
          を用いた
          <span className="text-primary underline decoration-secondary underline-offset-4 decoration-4">
            高速
          </span>
          レンダリング
        </>
      ),
    },
  ];
  return (
    <Box className="system laptop:pt-[15vh] pt-[10vh] section">
      <Typography className="font-bold text-primary text-2xl text-center laptop:mb-vw-16 mb-vw-5">
        管理が簡単な予約・自動投稿システム
        <span className="text-xs text-black">※</span>
      </Typography>
      <Box>
        <Container className="flex flex-wrap">
          {lists.map((list) => (
            <Box className="laptop:w-1/3 laptop:px-5 laptop:mb-0 w-full mb-[20px]">
              <Box className="text-center laptop:mb-vw-20 laptop:mx-[-20px] laptop:max-w-none max-w-[200px] mx-auto">
                <Image src={list.img} objectFit={"cover"} />
              </Box>
              <Card className="laptop:min-h-[150px] px-4 py-8 rounded-[20px] laptop:mx-0 mx-30 border-gray-400 border border-solid drop-shadow-xl grid place-items-center min-h-auto tablet:mx-vw-64 sp:mx-vw-40 mx-0">
                <Typography className="text-md tablet:px-0 font-semibold tablet:whitespace-normal sp:whitespace-nowrap text-center">
                  {list.dd}
                </Typography>
              </Card>
            </Box>
          ))}
          <Typography className="text-xs ml-auto mt-vw-10">
            ※予約・自動投稿システムは今後実装予定
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
