import Image from "next/image";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Fast from "../../public/image/fast.jpg";
import Cost from "../../public/image/cost.jpg";
import Easy from "../../public/image/easy.jpg";

export default function Merit() {
  const lists = [
    {
      img: Fast,
      dt: "即完成",
      dd: "一週間以内にデザインを作成、最短10日でホームページ開設",
    },
    {
      img: Cost,
      dt: "2週間,本当に0円",
      dd: "初期費用が無料、さらに無料体験で初めの2週間まで0円",
    },
    {
      img: Easy,
      dt: "手間なし",
      dd: "簡単な質問に答えるだけで、10日以内にデザインが完成",
    },
  ];
  return (
    <Box className="merit  laptop:pt-[14vh] pt-[5vh] section">
      <Typography className="font-bold text-primary text-2xl text-center laptop:mb-vw-16 mb-0">
        初期費用
        <span className="text-4xl">無料</span>
        、手間<span className="text-3xl">0</span>で作成
      </Typography>
      <Box>
        <Container className="flex flex-wrap">
          {lists.map((list) => (
            <Box className="laptop:w-1/3 laptop:px-vw-10 w-full mb-0 mx-auto">
              <Box className="text-center laptop:w-3/4 w-vw-80 mx-auto laptop:min-h-[30vh]">
                <Image src={list.img} objectFit={"cover"} />
              </Box>
              <Typography className="text-primary text-lg text-center whitespace-nowrap font-bold laptop:my-vw-6 my-2">
                {list.dt}
              </Typography>
              <Typography className="laptop:text-left text-sm tablet:px-0 px-[20px] text-center font-medium">
                {list.dd}
              </Typography>
            </Box>
          ))}
        </Container>
      </Box>
    </Box>
  );
}
