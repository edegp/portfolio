import cn from "classnames";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import FormControlLabel from "@mui/material/FormControlLabel";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { supabase } from "../../utils/supabase-client";
import { postData } from "../../utils/helpers";
import { getStripe } from "../../utils/stripe-client";
import { useUser } from "../../utils/useUser";
import { Price, ProductWithPrice } from "../types";
import Button from "../ui/Button";

export default function Plan({
  products = [
    {
      name: "basic",
      description: "高速でシンプルなHP,予約システム× 自動更新 ×",
      active: true,
      image: null,
      id: "prod_Lbj5yFsnU97dq4",
      metadata: {},
      prices: [
        {
          product_id: "prod_Lbj5yFsnU97dq4",
          currency: "jpy",
          billing_sheme: null,
          unit_amount: 1980,
          recurring: null,
          active: true,
          interval: "month",
          interval_count: 1,
          type: "recurring",
          id: "price_1KuVdaDhR8iHUYPXA1UivciE",
          metadata: {},
        },
      ],
    },
    {
      name: "standard",
      description: "自動投稿可能なHP,自動投稿○ 予約システム ×",
      active: true,
      image: null,
      id: "prod_Lbk1ExK5xk4Qnm",
      metadata: {},
      prices: [
        {
          product_id: "prod_Lbk1ExK5xk4Qnm",
          currency: "jpy",
          billing_sheme: null,
          unit_amount: 2980,
          recurring: null,
          active: true,
          interval: "month",
          interval_count: 1,
          type: "recurring",
          id: "price_1KuWXfDhR8iHUYPXcSwl6SIm",
          metadata: {},
        },
      ],
    },
    {
      name: "Premium",
      description: "自動投稿も予約システムも,予約システム○ 自動更新 ○",
      active: true,
      image: null,
      id: "prod_Lbk2qNYKofURFG",
      metadata: {},
      prices: [
        {
          product_id: "prod_Lbk2qNYKofURFG",
          currency: "jpy",
          billing_sheme: null,
          unit_amount: 4980,
          recurring: null,
          active: true,
          interval: "month",
          interval_count: 1,
          type: "recurring",
          id: "price_1KuWYNDhR8iHUYPXS31HTe3f",
          metadata: {},
        },
      ],
    },
  ],
  updatePlan,
  plan,
  ...other
}) {
  const router = useRouter();
  const handleChange = (e) => updatePlan?.(e);
  return (
    <RadioGroup
      row
      aria-labelledby="plan-radio"
      defaultValue="basic"
      name="plan"
      className="flex flex-wrap"
      value={plan}
      onChange={handleChange}
      {...other}
    >
      {products.map((product) => (
        <Box
          key={product.name}
          className="tablet:w-1/3 tablet:px-2 tablet:mb-0 w-full mb-[18px] grid"
        >
          <Paper
            elevation="2"
            className={`tablet:min-h-[150px] px-4 tablet:py-6 sp:py-3 py-1 rounded-[20px]  border-gray-400 border border-solid grid place-items-center min-h-auto tablet:mx-0 sp:mx-vw-64 mx-vw-48 ${
              product.name === "standard" && "pb-5"
            }`}
          >
            {router.pathname !== "/" ? (
              <FormControlLabel
                value={product.name}
                control={
                  <Radio
                    className={`pt-0 ${
                      router.pathname !== "/subscription" &&
                      "tablet:block hidden"
                    }`}
                  />
                }
                label={
                  <Typography className="text-md text-center tablet:mt-vw-3 mt-0 font-bold">
                    {product.name === "basic"
                      ? "ベーシック"
                      : product.name === "standard"
                      ? "スタンダード"
                      : product.name === "Premium"
                      ? "プレミアム"
                      : "特別"}
                    <br className="laptop:block sp:hidden block" />
                    プラン
                  </Typography>
                }
                labelPlacement="bottom"
              />
            ) : (
              <Typography className="text-md text-center tablet:mt-vw-3 mt-0 font-bold">
                {product.name === "basic"
                  ? "ベーシック"
                  : product.name === "standard"
                  ? "スタンダード"
                  : product.name === "Premium"
                  ? "プレミアム"
                  : "特別"}
                <br className="laptop:block sp:hidden block" />
                プラン
              </Typography>
            )}
            <List className="sp:py-[8px] py-0">
              {product.description?.split(",").map((point) => {
                return point.includes("○") ? (
                  <ListItem key={point} className="py-0">
                    <ListItemText
                      primary={
                        <Typography className="text-xs text-center font-semibold">
                          {point}
                        </Typography>
                      }
                    />
                  </ListItem>
                ) : (
                  <ListItem key={point} className="sp:block hidden py-0">
                    <ListItemText
                      primary={
                        <Typography className="text-xs text-center font-semibold">
                          {point}
                        </Typography>
                      }
                    />
                  </ListItem>
                );
              })}
            </List>
            <Typography className="text-sm tablet:px-0 font-semibold tablet:whitespace-normal sp:whitespace-nowrap text-center">
              月額&ensp;
              <span className="text-lg font-bold line-through">
                {product.prices[0]?.unit_amount | "お問い合わせください"}円
              </span>
              <ArrowRightAltIcon />
              0円(2週間)
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
  );
}
