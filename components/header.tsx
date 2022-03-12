import Link from "next/link";
import ContentfulImage from "./contentful-image";
import logo from "../public/logo.jpg";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import Image from 'next/image'

export default function Header() {
  let [isShow, setIsShow] = useState(false);
  const image = (
    <Image
      width={100}
      height={100}
      objectFit="cover"
      alt="logo"
      src={logo}
      className="mix-blend-multiply"
    />
  );
  return (
    <>
      <div className="header-logo flex items-center fixed top-h-w left-h-logo z-0 mix-blend-multiply">
        <Link href="/">
          <a className="hover:underline pt-1 pl-7 image-md">   {image}
           </a>
        </Link>
      </div>
      <ul className="flex items-center mr-6 text-lg fixed top-h-w right-h-w p-8">
        <li>
          <Button className="capitalize text-xl mr-5 text-black">About</Button>
        </li>
        <li>
          <Button className="capitalize text-xl mr-5 text-black">
            What I Can
          </Button>
        </li>
        <li>
          <Button className="capitalize text-xl mr-5 text-black">Blog</Button>
        </li>
        <li>
          <Button className="capitalize text-xl text-black">Contact</Button>
        </li>
      </ul>
    </>
  );
}
