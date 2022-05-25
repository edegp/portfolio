import cn from "classnames";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import FormControlLabel from "@mui/material/FormControlLabel";
import { supabase } from "../../utils/supabase-client";
import { postData } from "../../utils/helpers";
import { getStripe } from "../../utils/stripe-client";
import { useUser } from "../../utils/useUser";
import { Price, ProductWithPrice } from "../types";
import Button from "../ui/Button";

export default function Plan(props) {
  const handleChange = (e) => props.updatePlan?.(event.target.value);
  return (
    <RadioGroup
      row
      aria-labelledby="plan-radio"
      defaultValue="basic"
      name="plan"
      className="flex flex-wrap"
      value={props.plan}
      onChange={handleChange}
      {...props}
    >
      {props.products.map((product) => {
        return (
          <Box
            key={product.name}
            className="laptop:w-1/3 laptop:px-10 laptop:mb-0 w-full mb-[20px] grid"
          >
            <Card className="laptop:min-h-[150px] px-4 laptop:py-6 py-3 rounded-[20px]  border-gray-400 border border-solid drop-shadow-xl grid place-items-center min-h-auto laptop:mx-0 tablet:mx-[24vw]  sp:mx-vw-64 mx-vw-32">
              <FormControlLabel
                value={product.name}
                control={<Radio className="pt-0" />}
                label={
                  <Typography className="text-md text-center laptop:mt-vw-3 mt-0 font-bold">
                    {product.name}
                    <br className="laptop:block hidden" />
                    プラン
                  </Typography>
                }
                labelPlacement="bottom"
              />
              <List>
                {product.description && (
                  <>
                    {product.description.split(",").map((point) => (
                      <ListItem key={point} className="py-0">
                        <ListItemText
                          primary={
                            <Typography className="text-xs text-center font-semibold">
                              {point}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                  </>
                )}
              </List>
              <Typography className="text-sm tablet:px-0 font-semibold tablet:whitespace-normal sp:whitespace-nowrap text-center">
                月額&ensp;
                <span className="text-lg font-bold">
                  {product.prices[0].unit_amount}円
                </span>
              </Typography>
              <Typography className="text-sm tablet:px-0 text-center">
                無料期間終了後
              </Typography>
            </Card>
            {product.name === "スタンダード" && (
              <Chip
                className="my-[-25px] place-self-center w-[160px] font-bold z-40 text-xs"
                label="お得なプラン"
                color="primary"
              />
            )}
          </Box>
        );
      })}
    </RadioGroup>
  );
}
