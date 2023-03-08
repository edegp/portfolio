import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import Link from "next/link"
import Plan from "../Plan"

export default function Subscription() {
  return (
    <section id="subscription" className="text-center">
      <Container className="tablet:pt-[15vh] pt-24 pb-8">
        <Typography
          variant="h2"
          className="font-Noto-Sans font-bold text-lg
            laptop:mb-20
            tablet:mb-vw-20
            sp:mb-16
            mb-6
            mx-auto fadein whitespace-nowrap"
        >
          ANfulの飲食店向け低価格な
          <br />
          サブスクリプションサービス
        </Typography>
        <Plan />
        <Link href="/lp">
          <Button className="!bg-[#04ac4d] text-white hover:opacity-70 w-vw-70  rounded-full text-sm whitespace-nowrap px-10 mx-auto sp:mt-10 mt-0">
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
      </Container>
    </section>
  )
}
