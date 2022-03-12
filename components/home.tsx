import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import ContentfulImage from "../components/contentful-image";
import logo from "../public/logo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
export default function Home() {
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
    <section className="home w-full h-full">
      <div className="container-fluid">
        <div className="row h-[95vh] justify-center items-center text-center flex flex-wrap">
          <div className="sm: col-10 text-left z-10">
            <Typography
              variant="h2"
              className="font-G-light text-2xl text-light mb-5"
            >
              Design, development for your experience
            </Typography>
            <Typography
              variant="h1"
              className="font-G-bold text-7xl tracking-tight leading-tight mb-16"
            >
              Create functional Home Page for Private Business
            </Typography>
            <Button className="bg-black text-white rounded-full px-20 normal-case hover:bg-black hover:opacity-50">
              What I Can
            </Button>
          </div>
        </div>
      </div>
      <div className="scroll fixed bottom-h-w  left-h-logo">
        <div className="inline">
        <a href="" className="p-5 block">
          <div className="rotate-[-90deg] origin-top-left line-through">続く</div>
          <FontAwesomeIcon className="w-7 h-7 " icon={faArrowDown} />
        </a>
        </div>
      </div>
    </section>
  );
}
