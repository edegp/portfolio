import Image from "next/image";
// import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HP from "../../public/image/HPowner.png";
import IMG from "../../public/image/img.png";

export default function LPHome() {
  return (
      <Box className="contaienr-fluid pt-vw-40 pb-vw-10 px-vw-20 grid grid-flow-col grid-rows-[55vh,7vh]">
        <Typography
          variant="h1"
          className="text-2xl relative self-center leading-snug"
        >
          <Box className="absolute top-[-10vh] right-[calc(10vw-100px)]">
            <Image src={HP} width={200} height={200} />
          </Box>
          新規会員限定！
          <br />
          <span className="text-[#04ac4d]">
            2週間
            <span className="text-4xl">無料</span>
            体験
          </span>
          <br />
          小規模飲食店に特化した
          <br />
          ホームページで利益アップ！
        </Typography>
        <Button className="!bg-[#04ac4d] text-white hover:opacity-70 w-vw-70 justify-self-end rounded-full text-sm whitespace-nowrap px-10">
          無料体験をはじめる
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
        <Box className="row-span-2 w-vw-100 mr-[-10vw]">
          <Image src={IMG} width={1600} height={900} />
        </Box>
      </Box>
  );
}
