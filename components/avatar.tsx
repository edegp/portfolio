import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import ContentfulImage from "./contentful-image"
import noImage from "../public/image/noimage.jpg"

export default function Avatar({ name, picture }) {
  return (
    <Box className="inline-flex">
      <Box className="relative w-vw-4 h-vw-4 mr-vw-4 self-center">
        <ContentfulImage
          src={picture ? picture.url : noImage}
          layout="fill"
          className="rounded-full"
          alt={name}
        />
      </Box>
      <Typography className="text-xs">{name}</Typography>
    </Box>
  )
}
