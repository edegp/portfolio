/* eslint-disable react/destructuring-assignment */
import Box from "@mui/material/Box"
import List from "@mui/material/List"
import Typography from "@mui/material/Typography"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS, INLINES, NodeData } from "@contentful/rich-text-types"
import { ReactNode } from "react"
import Link from "next/link"
import Bookmark from "../ui/Bookmark"

const options = {
  renderNode: {
    [INLINES.HYPERLINK]: (node: NodeData, children: ReactNode) => (
      <Link target="_blank" rel="noopener noreferrer" href={node.data.uri}>
        {children}
      </Link>
    ),
    [INLINES.ENTRY_HYPERLINK]: (node: NodeData, children: ReactNode) => (
      <Link target="_blank" rel="noopener noreferrer" href={node.data.uri}>
        {children}
      </Link>
    ),
    [BLOCKS.PARAGRAPH]: (node: NodeData, children: string[]) => (
      <>
        <Typography className="font-[游明朝体]">{children}</Typography>
        {children[0] === "ブックマーク" && process.browser && (
          <Bookmark
            href={window.location.href}
            title={document.title}
            innerText="ブックマークする"
            onAddBookmark={undefined}
          />
        )}
      </>
    ),
    [BLOCKS.LIST_ITEM]: (node: NodeData, children) => (
      <List className="font-[游明朝体] list-disc">{children}</List>
    ),
  },
}
export default function PostBody({ content }) {
  return (
    <Box className="max-w-3xl mx-auto post-body">
      {documentToReactComponents(content.json, options)}
    </Box>
  )
}
