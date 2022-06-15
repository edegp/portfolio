import Head from "next/head";
import Box from "@mui/material/Box";
import MuiContainer from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CoverImage from "../../components/cover-image";
import Header from "../../components/header";
import Container from "../../components/container";
import MoreStories from "../../components/post/more-stories";
import Meta from "../../components/meta";
import Link from "../../components/Link";
import { getAllPostsForHome } from "../../lib/api";

export default function Blog({ preview, allPosts }) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  return (
    <>
      <Meta />
      <Head>
        <title>anfulのBlog</title>
      </Head>
      <Container>
        <MuiContainer>
          {heroPost && (
            <>
              <Box className="mt-[calc(3.5vw+70px)] mb-vw-8">
                <Typography
                  variant="h2"
                  className="text-3xl text-bold font-G-bold"
                >
                  Blog
                </Typography>
              </Box>
              <Link href={`/posts/${heroPost.slug}`}>
                <Box
                  className="mb-8 md:mb-16 bg-cover w-full"
                  sx={{
                    background: `url(${heroPost.coverImage.url})`,
                    aspectRatio: "16/9",
                  }}
                >
                  <Typography
                    className="mb-4 text-2xl leading-tight 
                    mix-blend-difference 
                  text-white
                  text-center
                  "
                  >
                    {heroPost.title}
                  </Typography>
                </Box>
              </Link>
            </>
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </MuiContainer>
      </Container>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const allPosts = (await getAllPostsForHome(preview)) ?? [];
  return {
    props: { preview, allPosts },
  };
}
