import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Link from "next/link"
// import Avatar from "../avatar";
// import DateComponent from "../date";
import CoverImage from "../cover-image"
// import ContentfulImage from "../contentful-image";

export default function HeroPost({
  title,
  coverImage,
  // date,
  // excerpt,
  // author,
  slug,
}) {
  const coverImg = (
    <CoverImage
      title={title}
      slug={slug}
      url={coverImage.url}
      width={1200}
      height={600}
    />
  )
  return (
    <section className="mt-vw-32">
      <Container>
        <Box className="mb-8 md:mb-16 ">
          <Typography
            className="mb-4 text-4xl lg:text-6xl leading-tight"
            sx={{ background: `url(${coverImg})` }}
          >
            <Link
              target="_blank"
              rel="noopener"
              href="/posts/[slug]"
              // as={`/posts/${slug}`}
            >
              {title}
            </Link>
          </Typography>
        </Box>
      </Container>
      {/* <div className="md:grid md:grid-cols-2 md:col-gap-16 lg:col-gap-8 mb-20 md:mb-28">
        <div>
          <div className="mb-4 md:mb-0 text-lg">
            <DateComponent dateString={date} />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          {author && <Avatar name={author.name} picture={author.picture} />}
        </div>
      </div> */}
    </section>
  )
}
