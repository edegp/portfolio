import { useRouter } from "next/router";
import Head from "next/head";
import ErrorPage from "next/error";
import MuiContainer from "@mui/material/Container";
import { getAllPostsWithSlug, getPostAndMorePosts } from "../../lib/api";
import Container from "../../components/container";
import SectionSeparator from "../../components/section-separator";
import PostBody from "../../components/post/post-body";
import MoreStories from "../../components/post/more-stories";
import PostHeader from "../../components/post/post-header";
import PostTitle from "../../components/post/post-title";

export default function Post({ post, morePosts }) {
  const router = useRouter();

  if (!router.isFallback && !post) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Container>
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          <article>
            <Head>
              <title>{post.title}</title>
              <meta property="og:image" content={post.coverImage.url} />
            </Head>
            <MuiContainer className="mt-vw-36">
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
                slug={post.slug}
              />
              <PostBody content={post.content} />
            </MuiContainer>
          </article>
          <SectionSeparator />
          {morePosts && morePosts.length > 0 && (
            <MoreStories posts={morePosts} />
          )}
        </>
      )}
    </Container>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getPostAndMorePosts(params.slug, preview);
  return {
    props: {
      preview,
      post: data?.post ?? null,
      morePosts: data?.morePosts ?? null,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();
  return {
    paths: allPosts?.map(({ slug }) => `/posts/${slug}`) ?? [],
    fallback: true,
  };
}
