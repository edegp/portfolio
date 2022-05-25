import { useState } from "react";
import { SliderPicker } from "react-color";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { upsertInfo } from "../../utils/supabase-admin";
import { postData } from "../../utils/helpers";

export default function Info({
  user,
  info,
  userDetails,
  customer,
  updateInfo,
  resetInfo,
  updateColor,
}) {
  const [update, setUpdate] = useState(null);
  const listclass = "text-color text-sm font-bold shrink-0 grow-0 basis-1/3";
  const customerInfo = [
    "site_name",
    "purpose",
    "color",
    "favorite",
    "google",
    "other",
  ];
  const name = (key, value) =>
    key === "purpose"
      ? "目的 : "
      : key === "site_name"
      ? "サイト名 : "
      : key === "color"
      ? "サイトのメインカラー : "
      : key === "favorite"
      ? "お気に入りのサイト : "
      : key === "google"
      ? "グーグルマップのURL : "
      : key === "other"
      ? "その他ご要望 : "
      : null;
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleColor = (color, event) =>
    setInfo((prev) => ({
      ...prev,
      ["color"]: color.hex,
    }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    await postData({
      url: "/api/update-customer",
      data: { customer, info },
    }).then(() => {
      setUpdate(true);
      setTimeout(() => setUpdate(false), [10000]);
    });
  };
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <List className="flex flex-wrap">
          {Object.entries(info)
            .filter(
              ([key, value]) => customerInfo.findIndex((e) => key === e) !== -1
            )
            .map(([key, value]) => {
              return (
                <ListItem className="w-full">
                  <ListItemText class={listclass}>
                    {name(key, value)}
                  </ListItemText>
                  {key !== "color" ? (
                    <TextField
                      name={key}
                      value={Object.values(info).find((v) => v === value)}
                      onChange={updateInfo}
                    />
                  ) : (
                    <Box className="w-full">
                      {" "}
                      <SliderPicker color={info.color} onChange={updateColor} />
                    </Box>
                  )}
                </ListItem>
              );
            })}
        </List>
        <Box className="flex mt-10">
          <Button
            className="text-color hover:opacity-70 w-vw-70 laptop:justify-self-end rounded-md text-xs whitespace-nowrap px-10 justify-self-center"
            onClick={() => updateInfo(userDetails)}
          >
            はじめの情報に戻す
          </Button>
          <Button
            className="!bg-color text-white hover:opacity-70 w-vw-70 laptop:justify-self-end rounded-md text-xs whitespace-nowrap px-10 justify-self-center"
            type="submit"
          >
            変更
          </Button>
          {update && (
            <Typography
              align="justify"
              className="self-center ml-10 text-color font-bold text-xs"
            >
              更新しました!
            </Typography>
          )}
        </Box>
      </form>
    </Container>
  );
}
