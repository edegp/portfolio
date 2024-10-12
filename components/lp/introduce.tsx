import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import React, { ChangeEvent, useState } from "react"
import Plan from "../Plan"
import Link from "next/link"
import { ProductWithPrice } from "../../types"

export default function Introduce({
  products,
}: {
  products: ProductWithPrice[]
}) {
  const [plan, setPlan] = useState<"basic" | "standard" | "Premium">("basic")
  const updatePlan = (
    event: ChangeEvent<HTMLInputElement>,
    value: "basic" | "standard" | "Premium"
  ) => setPlan(value)
  return (
    <Box className="system laptop:pt-[15vh] tablet:pt-[16vh] pt-[8vh] section">
      <Typography className="font-bold text-primary text-2xl text-center laptop:mb-vw-5 mb-vw-2">
        プランのご紹介
      </Typography>
      <Typography className="font-medium text-sm text-center mb-vw-6 px-vw-24">
        <span className="tablet:block hidden whitespace-nowrap">
          新規会員様は1か月の
        </span>
        無料期間終了後、
        <span className="tablet:block hidden">
          サイト作成プランなら 一か月
          <span className="text-md font-semibold">ワンコイン</span>で
        </span>
        キャンセルはいつでもOK
      </Typography>
      <Container className="grid laptop:gap-y-14 gap-y-0">
        <Plan products={products} updatePlan={updatePlan} plan={plan} />

        <Button
          className="!bg-[#04ac4d] text-white hover:opacity-70 w-vw-70
          rounded-full text-sm whitespace-nowrap px-10 mx-auto laptop:mt-0 tablet:mt-12 mt-0"
        >
          <Link
            className="w-fit text-center mx-auto flex"
            href={{ pathname: "../subscription", query: { plan } }}
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
          </Link>
        </Button>
        <Typography className="text-xs ml-auto mt-3">
          ※予約・キャッシュレス決済はSquareのサービスを採用
        </Typography>
      </Container>
    </Box>
  )
}
