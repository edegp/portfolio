import FBlogo from "../../public/image/facebook.png";
import Image from "next/image";

const Facebook = ({ ...props }) => {
  return <Image src={FBlogo} width={20} height={20} />;
};

export default Facebook;
