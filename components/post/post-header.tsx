import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Avatar from "../avatar";
import DateComponent from "../date";
import CoverImage from "../cover-image";
import PostTitle from "./post-title";
import Header from "../header";

export default function PostHeader({ title, coverImage, date, author, slug }) {
  return (
    <>
      {/* <Header /> */}
      <Box className="hidden md:block md:mb-12">
        {author && <Avatar name={author.name} picture={author.picture} />}
      </Box>
      <Box className="mb-8 md:mb-16 sm:mx-0 text-center">
        <CoverImage
          title={title}
          url={coverImage.url}
          slug={slug}
          width={800}
          height={450}
        />
      </Box>
      <PostTitle>{title}</PostTitle>
      <List className="text-center">
        <ListItem className="inline !p-0 !pl-2">
          <DateComponent className="text-xs" dateString={date} />
        </ListItem>
        <ListItem className="inline !p-0 !pl-2">
          {author && <Avatar name={author.name} picture={author.picture} />}
        </ListItem>
      </List>
    </>
  );
}
