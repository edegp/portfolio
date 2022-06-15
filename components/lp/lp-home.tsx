import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "../Link";
import HP from "../../public/image/HP.png";
import IMG from "../../public/image/img.png";

export default function LPHome() {
  return (
    <>
      <Box className="lp-home section contaienr-fluid  laptop:pt-[14vh] pt-[10vh] pb-vw-10 px-vw-20 grid laptop:grid-flow-col laptop:grid-rows-[55vh,5vh] laptop:grid-cols-[45%,60%] grid-flow-row grid-rows-[32vh,5.5vh,23vh]">
        <Typography
          variant="h1"
          className="text-lg relative self-center leading-snug font-bold text-shadow-md"
        >
          <Box className=" absolute top-[-60px] w-vw-56 min-w-[100px] max-w-[220px] laptop:right-[calc(8vw-120px)] sp:right-[calc(15vw-60px)] right-[calc(5vw-20px)]">
            <Image src={HP} />
          </Box>
          新規会員<span className="text-2xl">限定！</span>
          <br />
          <span className="text-primary">
            2週間
            <span className="text-5xl font-black">無料</span>
            体験
          </span>
          <br />
          小規模<span className="text-primary text-2xl">飲食店</span>に特化した
          <br />
          ホームページで
          <span className="text-2xl">利益</span>アップ！
        </Typography>

        <Button
          component={Link}
          href="../subscription"
          className="!bg-[#04ac4d] text-white hover:opacity-70 w-vw-70 laptop:justify-self-end rounded-full text-sm whitespace-nowrap px-10 justify-self-center"
        >
          <span className="font-[Noto Sans JP] font-bold">
            無料体験をはじめる
          </span>
          <svg
            id="icon_navigation_chevron_right_24px"
            data-name="icon/navigation/chevron_right_24px"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <rect id="Boundary" width="24" height="24" fill="none" />
            <path
              id="_Color"
              data-name=" ↳Color"
              d="M1.408,0,0,1.41,4.574,6,0,10.59,1.408,12,7.4,6Z"
              transform="translate(8.6 6)"
              fill="#fff"
            />
          </svg>
        </Button>
        <Box className="row-span-2 w-vw-100 mr-[-10vw] grid">
          <Box>
            <Image src={IMG} width={1600} height={900} />
          </Box>
          <Typography className="text-[12px] self-end font-normal mr-vw-28 inline-block justify-self-end">
            ※出典：東京商工会議所 がんばる飲食店応援サイト！
            アンケート調査結果（2013）
          </Typography>
        </Box>
      </Box>
    </>
  );
}
