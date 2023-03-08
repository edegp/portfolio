import Image from "next/image"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Grow from "@mui/material/Grow"
import { useState } from "react"
import TroubleImg from "../../public/image/trouble.svg"

const iconList = [
  "常連客は多いけれど\nなかなか新しいお客さんが来ない",
  "忙しい時に新たに人を雇いたいけど\nいい人が見つからない…",
  "キャッシュレスを導入したいけど\n費用が心配",
  "予約してもらえるお客さんが少なく、\n仕入れが難しい",
  "自分で作ってみたけど\nイメージ通りのHPができない",
]

const blow = "ml-[-14px] absolute boder-solid border-transparent"
const blowBeforeCss = [
  "bottom-[-29px] left-[80%] border-t-white border-r-white  border-[15px] hidden tablet:block",
  "bottom-[-29px] left-[50%]  border-t-white border-[15px] hidden tablet:block",
  "bottom-[-29px] left-[20%] border-t-white border-l-white  border-[15px] hidden tablet:block",
  "right-[-29px] top-[40%] border-l-white  border-[15px] hidden tablet:block",
  "left-[-14px] top-[30%] border-r-white  border-[15px] hidden tablet:block",
]
const blowafter = "drop-shadow-blow z-[-10] border-[14px]"
const blowAfterCss = [
  "bottom-[-27px] left-[80%] border-t-white border-r-white hidden tablet:block",
  "bottom-[-27px] left-[50%]  border-t-white hidden tablet:block",
  "bottom-[-27px] left-[20%] border-t-white border-l-white hidden tablet:block",
  "right-[-27px] top-[40%] border-l-white hidden tablet:block",
  "left-[-13px] top-[30%] border-r-white hidden tablet:block",
]

export default function Trouble(checked) {
  return (
    <Box className="merit laptop:pt-[14vh] pt-[5vh] section">
      <Typography className="font-bold text-primary text-2xl text-center laptop:mb-vw-10 tablet:mb-[10vh] mb-2">
        こんなことでお困りではありませんか？
      </Typography>
      <Box className="grid laptop:grid-cols-[repeat(3,33%)] tablet:grid-cols-[repeat(3,34%)] gap-x-20  tablet:gap-x-5 tablet:gap-y-20 gap-y-4 auto-cols-min tablet:px-[4%] mx-[2%]">
        {iconList.map((icon, index) => (
          <>
            <Grow
              in={checked}
              style={{ transformOrigin: "0 0 0" }}
              {...(checked ? { timeout: 1000 } : {})}
              key={index}
            >
              <Box className="relative">
                <span className={`${blow} ${blowBeforeCss[index]}`} />
                <Paper
                  className="tablet:rounded-[30px] rounded-2xl"
                  elevation={4}
                >
                  <Typography
                    className={`p-vw-8 text-sm text-center whitespace-nowrap ${
                      index !== 0 &&
                      index !== 1 &&
                      index !== 2 &&
                      "hidden tablet:block"
                    }`}
                  >
                    {icon
                      .split(/(\n)/)
                      .map((line) => (line.match(/\n/) ? <br /> : line))}
                  </Typography>
                </Paper>
                <span
                  className={`${blow} ${blowafter} ${blowAfterCss[index]}`}
                />
              </Box>
            </Grow>
            {index === 3 && (
              <Box className="text-cetner row-span-2 w-full">
                <TroubleImg className="mx-auto " />
              </Box>
            )}
          </>
        ))}
      </Box>
    </Box>
  )
}
