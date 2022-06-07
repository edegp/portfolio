import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Link from "./Link";
import { getURL } from "../utils/helpers";

export default function Footer() {
  const li = "w-auto p-0 pr-2";
  const liLink = "text-[#888888] font-normal";
  return (
    <footer className="bg-white h-[5vh] my-6">
      <List className="text-[#888888] text-xs flex flex-nowrap p-0 justify-center">
        <ListItem className={li}>
          <Link href={getURL() + "/trade"} className={liLink}>
            特定商取引法に基づく表示 /
          </Link>
        </ListItem>
        <ListItem className={li}>
          <Link href={getURL() + "/policy"} className={liLink}>
            個人情報の取扱いについて /
          </Link>
        </ListItem>
        <ListItem className={li}>
          <Link href={getURL() + "/terms"} className={liLink}>
            利用規約
          </Link>
        </ListItem>
      </List>
    </footer>
  );
}
