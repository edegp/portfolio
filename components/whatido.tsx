import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import ContentfulImage from "../components/contentful-image";
import logo from "../public/logo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

export default function WhatIDo() {
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
    <section id="whatido" className="w-full h-full bg-black min-h-screen text-white ">
      <div className="container-fluid">
        <div className="row h-[95vh] justify-center items-center text-center flex flex-wrap">
          <div className="sm: col-10 text-left z-10">
            <Typography
              variant="h1"
              className="font-G-bold text-7xl tracking-tight leading-tight mb-16"
            >
              What I do
            </Typography>
            <Button className="bg-black text-white rounded-full px-20 normal-case hover:bg-black hover:opacity-50">
              What I Can
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
