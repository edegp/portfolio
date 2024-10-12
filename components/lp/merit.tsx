import Image from "next/image"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Fast from "../../public/image/fast.jpg"
import Cost from "../../public/image/cost.jpg"
import Easy from "../../public/image/easy.jpg"

export default function Merit() {
  const lists = [
    {
      img: Fast,
      dt: "待ち時間がほぼ０",
      dd: `一週間以内にデザインを作成、\n最短10日でホームページ開設`,
    },
    {
      img: Cost,
      dt: "1か月,本当に0円",
      dd: `初期費用無料、初めの1か月は0円、\nサイト作成プランなら一か月1コインで`,
    },
    {
      img: Easy,
      dt: "手間０",
      dd: `5分程度の簡単な質問の入力で、\n10日以内にデザインが完成`,
    },
  ]
  return (
    <Box className="merit  laptop:pt-[14vh] pt-[5vh] section">
      <Typography className="font-bold text-primary text-2xl text-center laptop:mb-vw-16 mb-4">
        ANfulの3つの<span className="text-3xl">０</span>
      </Typography>
      <Box>
        <Container className="flex flex-wrap">
          {lists.map((list) => (
            <Box
              key={list.dt}
              className="laptop:w-1/3 laptop:px-vw-10 w-full mb-0 mx-auto"
            >
              <Box className="text-center laptop:w-3/4 tablet:w-vw-48 w-vw-72 mx-auto laptop:min-h-[30vh]">
                <Image src={list.img} width={400} alt="0 image" />
              </Box>
              <Typography className="text-primary text-lg text-center whitespace-nowrap font-bold laptop:my-vw-6 my-1">
                {list.dt}
              </Typography>
              <Typography className="text-sm tablet:px-0 px-[20px] text-center font-medium">
                {list.dd
                  .split(/(\n)/)
                  .map((dd) => (dd.match(/\n/) ? <br /> : dd))}
              </Typography>
            </Box>
          ))}
        </Container>
      </Box>
    </Box>
  )
}
