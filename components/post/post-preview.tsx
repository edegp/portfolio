import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Link from "../Link";
import Avatar from "../avatar";
import DateComponent from "../date";
import CoverImage from "../cover-image";

export default function PostPreview({
  title,
  coverImage,
  date,
  // excerpt,
  author,
  slug,
}) {
  return (
    <Container>
      <Box className="my-5">
        <CoverImage
          title={title}
          slug={slug}
          url={coverImage.url}
          width={320}
          height={180}
        />
      </Box>
      <Link
        href={`/posts/${slug}`}
        className="hover:underline text-sm mb-3 leading-snug "
      >
        {title}
      </Link>
      <List>
        <ListItem className="inline  !p-0 !pl-2">
          <DateComponent className="text-xs" dateString={date} />
        </ListItem>
        <ListItem className="inline !p-0 !pl-2">
          {author && <Avatar name={author.name} picture={author.picture} />}
        </ListItem>
      </List>
    </Container>
  );
}
