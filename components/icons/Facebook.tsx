import FBlogo from "../../public/image/facebook.png"
import Image from "next/image"

const Facebook = ({ ...props }) => {
  return <Image src={FBlogo} width={20} height={20} alt="facebook logo" />
}

export default Facebook
