/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
import Image from "next/image"
import Link from "@mui/material/Link"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import * as rdd from "react-device-detect"
import { SAFARI_SHARE, MENU_ICON, STAR_ICON } from "./images"

export type BookMarkProps = {
  className?: string
  linkClassName?: string
  title: string
  href: string
  innerText: string
  onAddBookmark?: () => void
}

export default function Bookmark({
  className = "",
  linkClassName = "",
  title = "",
  href = "#",
  innerText = "ブックマークする",
  onAddBookmark,
}: BookMarkProps) {
  const handleAddBookmark = () => onAddBookmark()

  const Mobile = () =>
    rdd.isSafari && rdd.isIOS ? (
      <Box>
        <Box>
          <img
            width={"30"}
            className="rounded-[5px]"
            src={SAFARI_SHARE}
            alt="favorite"
          />
        </Box>
        を押して
        <strong>お気に入りに追加</strong>
      </Box>
    ) : rdd.isChrome || rdd.isFirefox ? (
      <Box>
        <Box>
          <img width={"20"} src={MENU_ICON} alt="favorite" />
        </Box>
        を押して
        <Box>
          <img width={"20"} src={STAR_ICON} alt="favorite" />
        </Box>
        でブックマーク
      </Box>
    ) : (
      <Typography>後でブックマークするために覚えておいてください</Typography>
    )

  const Tablet = () =>
    rdd.isChrome || rdd.isFirefox ? (
      <>
        <Image
          width={"20"}
          className="invert"
          src={STAR_ICON}
          alt="favorite toolbar"
        />
        ブックマークツールバーに追加
      </>
    ) : (
      <Typography>後でブックマークするために覚えておいてください</Typography>
    )

  return (
    <Box className={className}>
      {rdd.isMobile ? (
        <Mobile />
      ) : rdd.isTablet ? (
        <Tablet />
      ) : rdd.isFirefox ? (
        <Button>
          <Link
            className={linkClassName}
            onClick={handleAddBookmark}
            title={title}
            href={href}
            rel="sidebar"
          >
            {innerText}
          </Link>
        </Button>
      ) : (
        <span>
          <strong>{rdd.isMacOs ? "Command (⌘)" : "Ctrl"} + D</strong>を押して
          ブックマーク
        </span>
      )}
    </Box>
  )
}
