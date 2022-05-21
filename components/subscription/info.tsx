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
import { upsertInfo } from "../../utils/supabase-admin";
import { postData } from "../../utils/helpers";

export default function Info({ user, userDetails, customer }) {
  const [info, setInfo] = useState(userDetails);
  console.log(userDetails);
  const listclass = "text-sm text-gray-700 shrink-0 grow-0 basis-1/3";
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
    const { update } = await postData({
      url: "/api/update-customer",
      data: { customer, info },
    });
  };
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <List className="flex flex-wrap">
          {Object.entries(userDetails)
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
                      onChange={handleChange}
                    />
                  ) : (
                    <Box className="w-full">
                      {" "}
                      <SliderPicker color={info.color} onChange={handleColor} />
                    </Box>
                  )}
                </ListItem>
              );
            })}
        </List>
        <Box className="flex mt-10">
          <Button
            className="hover:opacity-70 w-vw-70 laptop:justify-self-end rounded-md text-xs whitespace-nowrap px-10 justify-self-center"
            onClick={() => setInfo(userDetails)}
          >
            はじめの情報に戻す
          </Button>
          <Button
            className="!bg-[#04ac4d] text-white hover:opacity-70 w-vw-70 laptop:justify-self-end rounded-md text-xs whitespace-nowrap px-10 justify-self-center"
            type="submit"
          >
            変更
          </Button>
        </Box>
      </form>
    </Container>
  );
}

// withPageAuth({ redirectTo: "/subscription/signin" });
