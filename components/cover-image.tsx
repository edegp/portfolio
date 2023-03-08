import Link from "next/link"
import cn from "classnames"
import ContentfulImage from "./contentful-image"

export default function CoverImage({ title, url, slug, width, height }) {
  const image = (
    <ContentfulImage
      width={width}
      height={height}
      alt={`Cover Image for ${title}`}
      className={cn("shadow-small", {
        "hover:shadow-medium transition-shadow duration-200": slug,
      })}
      src={url}
    />
  )

  return (
    <div className="sm:mx-0">
      {slug ? <Link href={`/posts/${slug}` || "#"}>{image}</Link> : image}
    </div>
  )
}
