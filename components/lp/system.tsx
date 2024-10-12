import Image from "next/image"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Schedule from "../../public/image/Schedule.jpg"
import Speedy from "../../public/image/Speedy.jpg"
import Auto from "../../public/image/Auto.jpg"

export default function System() {
  const lists = [
    {
      img: Schedule,
      dd: (
        <>
          <span className="text-primary">予約・注文情報(POSレジ)</span> <br />を{" "}
          <span className="text-primary underline decoration-secondary underline-offset-4 decoration-4">
            スマホ
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
          <br />
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
          <br />
          <span className="text-primary underline decoration-secondary underline-offset-4 decoration-4">
            高速
          </span>
          なサイト
        </>
      ),
    },
  ]
  return (
    <Box className="system laptop:pt-[12vh] sp:pt-[6vh] pt-[8vh] section relative">
      <Typography className="font-bold text-primary text-2xl text-center laptop:mb-vw-12 mb-vw-5">
        管理が簡単なシステム
        <span className="text-xs text-black">※</span>
      </Typography>
      <Box>
        <Container className="flex flex-wrap justify-between">
          {lists.map((list) => (
            <Box className="laptop:w-[30%] laptop:px-5 laptop:mb-0 w-full [&:not(:last-of-type)]:mb-[32px] laptop:h-[55vh] sxsp:h-[23vh] flex flex-col justify-between">
              <Box className="text-center laptop:mx-[-20px] laptop:max-w-none sp:max-w-[140px] max-w-[90px] mx-auto">
                <Image
                  src={list.img}
                  className="object-cover"
                  alt="easy system"
                />
              </Box>
              <Paper
                elevation={2}
                className="laptop:min-h-[140px] px-2 py-3 rounded-[15px] laptop:mx-0 mx-30 border-gray-400 border border-solid grid place-items-center min-h-auto tablet:mx-vw-64 mx-vw-36 "
              >
                <Typography className="text-md tablet:px-0 font-semibold tablet:whitespace-normal sp:whitespace-nowrap text-center">
                  {list.dd}
                </Typography>
              </Paper>
            </Box>
          ))}
          <Typography className="text-xs ml-auto mt-vw-3 absolute bottom-2 right-2">
            ※予約・POSレジはSquareのサービスを採用
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}
