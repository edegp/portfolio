import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Link from "./Link";
import { getURL } from "../utils/helpers";

export default function Footer() {
  return (
    <footer className="bg-white h-[5vh] pl-vw-48 border-t border-gray-500">
      <List className="text-black mx-auto">
        <ListItem>
          <Link href={getURL() + "/trade"}>特定商取引法に基づく表示</Link>
        </ListItem>
        <ListItem>
          <Link href={getURL() + "/policy"}>個人情報の取扱いについて</Link>
        </ListItem>
        {/* <ListItem>
          <Link href={getURL() + "/terms"}>利用規約</Link>
        </ListItem> */}
      </List>
    </footer>
  );
}
