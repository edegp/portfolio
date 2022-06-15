import React from "react";
import Image from "next/image";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { SAFARI_SHARE, MENU_ICON, STAR_ICON } from "./images";
import * as rdd from "react-device-detect";

type Props = {
  className: string;
  linkClassName: string;
  title: string;
  href: string;
  innerText: string;
  onAddBookmark: () => void;
};

export default function Bookmark({
  className = "",
  linkClassName = "",
  title = "",
  href = "#",
  innerText = "ブックマークする",
  onAddBookmark,
}) {
  const handleAddBookmark = () => {
    prosess.browser && window.external?.AddFavourite?.(href, title); // eslint-disable-line new-cap
    onAddBookmark();
  };
  const mobile = () => {
    rdd.isSafari && rdd.isIOS ? (
      <Box>
        <Box>
          <Image width={30} className="rounded-[5px]" src={SAFARI_SHARE} />
        </Box>{" "}
        を押して
        <strong>お気に入りに追加</strong>
      </Box>
    ) : rdd.isChrome || rdd.isFirefox ? (
      <Box>
        <Box>
          <Image width={20} className="invert" src={MENU_ICON} />
        </Box>{" "}
        を押して{" "}
        <Box>
          <Image width={20} className="invert" src={STAR_ICON} />
        </Box>
        ブックマーク
      </Box>
    ) : (
      <Typography>後でブックマークするために覚えておいてください</Typography>
    );
  };
  const tablet = () => {
    rdd.isChrome || rdd.isFirefox ? (
      <>
        <Image width={20} className="invert" src={STAR_ICON} />{" "}
        ブックマークツールバーに追加
      </>
    ) : (
      <Typography>後でブックマークするために覚えておいてください</Typography>
    );
  };

  return (
    <Box className={className}>
      {rdd.isMobile ? (
        mobile
      ) : rdd.isTablet ? (
        tablet
      ) : rdd.isFirefox ? (
        <Link
          className={linkClassName}
          onClick={handleAddBookmark}
          title={title}
          href={href}
          rel="sidebar"
        >
          <Button>{innerText}</Button>
        </Link>
      ) : prosess.browser && window.external?.AddFavourite ? (
        <Link
          className={linkClassName}
          onClick={handleAddBookmark}
          title={title}
          href={href}
        >
          <Button>{innerText}</Button>
        </Link>
      ) : (
        <span>
          <strong>{rdd.isMacOs ? "Command (⌘)" : "Ctrl"} + D</strong>を押して
          ブックマーク
        </span>
      )}
    </Box>
  );
}
