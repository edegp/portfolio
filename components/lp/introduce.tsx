import { useState } from "react";
import Image from "next/image";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Plan from "../Plan";
import Link from "../Link";

export default function Introduce({ products }) {
  const [plan, setPlan] = useState("basic");
  const updatePlan = (e) => setPlan(e.target.value);
  return (
    <Box className="system laptop:pt-[15vh] sp:pt-[4vh] pt-0 section">
      <Typography className="font-bold text-primary text-2xl text-center laptop:mb-vw-5 mb-vw-2">
        プランのご紹介
      </Typography>
      <Typography className="font-medium text-sm text-center mb-vw-6 px-vw-24">
        <span className="tablet:block hidden whitespace-nowrap">
          新規会員様は2週間の
        </span>
        無料期間終了後、
        <span className="tablet:block hidden">
          スタンダードプランなら たった
          {/* <br className="laptop:hidden block" /> */}
          <span className="text-md font-semibold">2980円</span>で
        </span>
        キャンセルはいつでもOK
      </Typography>
      <Container className="grid laptop:gap-y-14 gap-y-0">
        <Plan products={products} updatePlan={updatePlan} />
        <Link
          className="w-fit text-center mx-auto"
          href={{ pathname: "../subscription", params: plan }}
        >
          <Button
            className="!bg-[#04ac4d] text-white hover:opacity-70 w-vw-70 
          rounded-full text-sm whitespace-nowrap px-10 mx-auto laptop:mt-0 tablet:mt-12 mt-0"
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
        </Link>
        <Typography className="text-xs ml-auto">
          ※予約システムは今後実装予定
        </Typography>
      </Container>
    </Box>
  );
}
