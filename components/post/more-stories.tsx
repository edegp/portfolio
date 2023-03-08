import MuiContainer from "@mui/material/Container";
import PostPreview from "./post-preview";

export default function MoreStories({ posts }) {
  return (
    <section>
      <MuiContainer className="grid grid-cols-3 md:grid-cols-2 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.sys.updatedAt}
            author={post.author}
            slug={post.slug}
          />
        ))}
      </MuiContainer>
    </section>
  );
}
