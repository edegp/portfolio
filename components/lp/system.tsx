import Image from "next/image";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
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
    <Box className="system laptop:pt-[15vh] sp:pt-[10vh] pt-[8vh] section">
      <Typography className="font-bold text-primary text-2xl text-center laptop:mb-vw-12 mb-vw-5">
        管理が簡単なシステム
        <span className="text-xs text-black">※</span>
      </Typography>
      <Box>
        <Container className="flex flex-wrap justify-between">
          {lists.map((list) => (
            <Box className="laptop:w-[30%] laptop:px-5 laptop:mb-0 w-full mb-[20px] laptop:h-[55vh] h-[22vh] flex flex-col  justify-between">
              <Box className="text-center laptop:mx-[-20px] laptop:max-w-none sp:max-w-[140px] max-w-[90px] mx-auto">
                <Image src={list.img} objectFit={"cover"} />
              </Box>
              <Paper
                elevation="2"
                className="laptop:min-h-[140px] px-2 py-3 rounded-[15px] laptop:mx-0 mx-30 border-gray-400 border border-solid grid place-items-center min-h-auto tablet:mx-vw-64 mx-vw-36 "
              >
                <Typography className="text-md tablet:px-0 font-semibold tablet:whitespace-normal sp:whitespace-nowrap text-center">
                  {list.dd}
                </Typography>
              </Paper>
            </Box>
          ))}
          <Typography className="text-xs ml-auto mt-vw-3">
            ※予約システムは今後実装予定
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
