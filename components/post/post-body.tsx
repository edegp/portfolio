import { useEffect } from "react";
import Script from "next/script";
import Image from "next/image";
import Link from "../Link";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";
const Bookmark = dynamic(() => import("../ui/Bookmark"), { ssr: false });
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import markdownStyles from "../markdown-styles.module.css";

const website_url = process.env.VERCEL_URL | "http://localhost:3000";
const options = {
  renderNode: {
    [INLINES.HYPERLINK]: (node, children) => {
      return (
        <Link target="_blank" rel="noopener noreferrer" href={node.data.uri}>
          {children}
        </Link>
      );
    },
    [INLINES.ENTRY_HYPERLINK]: (node, children) => {
      return (
        <Link target="_blank" rel="noopener noreferrer" href={node.data.uri}>
          {children}
        </Link>
      );
    },
    [BLOCKS.PARAGRAPH]: (node, children) => {
      return (
        <>
          <Typography className="font-[游明朝体]">{children}</Typography>
          {children[0] === "ブックマーク" && process.browser && (
            <Bookmark
              href={window.location.href}
              title={document.title}
              innerText="ブックマークする"
            />
          )}
        </>
      );
    },
    [BLOCKS.LIST_ITEM]: (node, children) => {
      return (
        <>
          <List className="font-[游明朝体] list-disc">{children}</List>
        </>
      );
    },
  },
};
export default function PostBody({ content }) {
  return (
    <Box className="max-w-3xl mx-auto post-body">
      {documentToReactComponents(content.json, options)}
    </Box>
  );
}
