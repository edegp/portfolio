import { useRouter } from "next/router"
import { ChangeEvent } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import Chip from "@mui/material/Chip"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import FormControlLabel from "@mui/material/FormControlLabel"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"
import { ProductWithPrice } from "../types"

type Props = React.ComponentPropsWithoutRef<"div"> & {
  products?: ProductWithPrice[]
  updatePlan?: (event: ChangeEvent<HTMLInputElement>, value: string) => void
  plan?: "basic" | "standard" | "Premium"
}

export default function Plan({
  products = [
    {
      id: "",
      name: "basic",
      description: "高速でシンプルなHP,予約システム× 自動更新 ×",
      active: true,
      prices: [{ id: "", unit_amount: 500, active: true, interval: "month" }],
    },
    {
      id: "",
      name: "standard",
      description: "自動投稿可能なHP,自動投稿○ 予約システム ×",
      active: true,
      prices: [
        {
          unit_amount: 980,
          active: true,
          interval: "month",
          id: "price_1KuWXfDhR8iHUYPXcSwl6SIm",
        },
      ],
    },
    {
      id: "",
      name: "Premium",
      description:
        "自動投稿も予約システムも,予約・キャッシュレス決済○ 自動更新 ○",
      active: true,
      prices: [
        {
          id: "",
          unit_amount: 1980,
          active: true,
          interval: "month",
        },
      ],
    },
  ],
  updatePlan,
  plan,
  ...other
}: Props) {
  const router = useRouter()
  const planName = (product: ProductWithPrice) => {
    switch (product.name) {
      case "basic":
        return "ページ作成"
      case "standard":
        return "自動投稿"
      case "Premium":
        return "プレミアム"
      default:
        return "特別"
    }
  }
  return (
    <RadioGroup
      row
      aria-labelledby="plan-radio"
      defaultValue="basic"
      name="plan"
      className="flex flex-wrap gap-y-8"
      value={plan}
      onChange={updatePlan}
      {...other}
    >
      {products.map((product) => (
        <Box
          key={product.name}
          className="tablet:w-1/3 tablet:px-2 tablet:mb-0 w-full mb-[18px] grid"
        >
          <Paper
            elevation={2}
            className={`tablet:min-h-[150px] px-4 tablet:py-6 sp:py-3 py-1 rounded-[20px]  border-gray-400 border border-solid grid place-items-center min-h-auto tablet:mx-0 sp:mx-vw-64 mx-vw-48 ${
              product.name === "standard" && "pb-5"
            }`}
          >
            <FormControlLabel
              value={product.name}
              control={
                <Radio
                  className={`pt-0 ${
                    router.pathname !== "/subscription" && "tablet:block hidden"
                  }`}
                />
              }
              label={
                <>
                  {planName(product)}
                  <br className="laptop:block sp:hidden block" />
                  プラン
                </>
              }
              labelPlacement="bottom"
            />
            <List className="sp:py-[8px] py-0">
              {product.description?.split(",").map((point) =>
                point.includes("○") ? (
                  <ListItem key={point} className="py-0">
                    <ListItemText
                      primary={
                        <p className="text-xs text-center font-semibold">
                          {point}
                        </p>
                      }
                    />
                  </ListItem>
                ) : (
                  <ListItem key={point} className="sp:block hidden py-0">
                    <ListItemText
                      primary={
                        <p className="text-xs text-center font-semibold">
                          {point}
                        </p>
                      }
                    />
                  </ListItem>
                )
              )}
            </List>
            <Typography className="text-sm tablet:px-0 font-semibold tablet:whitespace-normal sp:whitespace-nowrap text-center">
              月額&ensp;
              <span className="text-lg font-bold line-through">
                {product.prices[0]?.unit_amount.toString() ||
                  "お問い合わせください"}
                円
              </span>
              <ArrowRightAltIcon />
              0円(1か月)
            </Typography>
          </Paper>
          {product.name === "standard" && (
            <Chip
              className="my-[-25px] place-self-center w-[160px] font-bold z-40 text-xs"
              label="お得なプラン"
              color="primary"
            />
          )}
        </Box>
      ))}
    </RadioGroup>
  )
}
