import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import InstagramIcon from "@mui/icons-material/Instagram"
import Link from "next/link"
import ContactForm from "../contactForm"

export default function Contact() {
  return (
    <section id="contact">
      <Container className="laptop:pt-vw-44 tablet:pt-vw-64 pt-[15vh] pb-30 flex">
        <Box className="w-[30%] mr-vw-8 tablet:flex items-end flex-col hidden">
          <Box className="mail mb-10 pl-[15%]">
            <Typography className="tracking-[0.3em] ">CONTACT</Typography>
            <Typography className="mt-5 text-[#afafaf] text-sm underline">
              info@anful.shop
            </Typography>
          </Box>
          <Box className="sns flex items-start flex-col w-[calc(110px+2.5vw)]">
            <Typography className="tracking-[0.3em] ">SNS</Typography>
            <List className="flex">
              <ListItem className="p-0">
                <ListItemIcon className="min-w-[calc(2vw+18px)] text-[#afafaf]">
                  <Link href="https://qiita.com/edegp" target="_blank">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="calc(1vw + 10px)"
                      height="calc(1vw + 10px)"
                      viewBox="0 0 34.398 36.854"
                    >
                      <path
                        color="#afafaf"
                        fill="currentcolor"
                        id="q-solid"
                        d="M30.181,60.446A17.173,17.173,0,0,0,17.269,32a17.2,17.2,0,1,0-.14,34.4A17.084,17.084,0,0,0,26.4,63.664l3.588,4.306a2.456,2.456,0,1,0,3.774-3.145ZM17.2,61.482A12.25,12.25,0,1,1,29.482,49.2a12.161,12.161,0,0,1-2.527,7.38l-5.411-5.5a2.456,2.456,0,1,0-3.774,3.145l5.492,6.59A12.155,12.155,0,0,1,17.2,61.482Z"
                        transform="translate(0 -32)"
                      />
                    </svg>
                  </Link>
                </ListItemIcon>
              </ListItem>
              <ListItem className="p-0">
                <Link
                  href="https://www.instagram.com/anfulled4/"
                  target="_blank"
                >
                  <ListItemIcon className="min-w-[calc(2vw+25px)] text-[#afafaf]">
                    <InstagramIcon className="text-[#afafaf] text-[calc(1vw+15px)]" />
                  </ListItemIcon>
                </Link>
              </ListItem>
              <ListItem className="p-0">
                <ListItemIcon>
                  <Link
                    href="https://note.com/edegp"
                    target="_blank"
                    className="min-w-[calc(2vw+20px)] text-[#afafaf]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="calc(1vw + 10px)"
                      height="calc(1vw + 10px)"
                      viewBox="0 0 37.496 37.496"
                    >
                      <path
                        color="#afafaf"
                        fill="currentcolor"
                        id="note-sticky-solid"
                        d="M32.909,32H3.949A3.949,3.949,0,0,0,0,35.949v28.96a3.95,3.95,0,0,0,3.949,3.949h20.2a5.267,5.267,0,0,0,3.724-1.543l7.447-7.447a5.254,5.254,0,0,0,1.541-3.722v-20.2A3.95,3.95,0,0,0,32.909,32ZM5.265,37.265H31.593V55.695H26.327a2.633,2.633,0,0,0-2.633,2.633v5.265H5.265Z"
                        transform="translate(36.294 69.491) rotate(-179)"
                      />
                    </svg>
                  </Link>
                </ListItemIcon>
              </ListItem>
            </List>
          </Box>
        </Box>
        <ContactForm />
      </Container>
    </section>
  )
}
