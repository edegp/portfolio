import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Layout from "../components/layout";
import Home from "../components/home";
import WhatIDo from "../components/whatido";
import { getAllPostsForHome } from "../lib/api";
import Head from "next/head";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import ContentfulImage from "../components/contentful-image";
import logo from "../public/logo.jpg";

export default function Index({ preview, allPosts }) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  const image = (
    <ContentfulImage
      width={96}
      height={96}
      objectFit="cover"
      alt="logo"
      src={logo}
    />
  );
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title> anful </title>
        </Head>
        <Container>
        <Home />
        <WhatIDo />
          {/* {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />} */}
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const allPosts = (await getAllPostsForHome(preview)) ?? [];
  return {
    props: { preview, allPosts },
  };
}
