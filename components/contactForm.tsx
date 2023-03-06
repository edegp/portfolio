import { useState } from "react"
import { useRouter } from "next/router"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import TextField from "@mui/material/TextField"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import FormGroup from "@mui/material/FormGroup"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Button from "@mui/material/Button"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import FormLabel from "@mui/material/FormLabel"
import { User } from "@supabase/gotrue-js"
import { postData } from "../utils/helpers"
import { UserDetails } from "../types"

export default function ContactForm({
  user,
  info,
}: {
  user?: User
  info?: UserDetails
}) {
  const [alignment, setAlignment] = useState<string | null>("2-5")
  const router = useRouter()
  const [state, setState] = useState({
    name: "",
    email: "",
    design: false,
    payment: false,
    info: false,
    other: false,
    about: false,
    message: "",
    sucssess: "",
  })
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    event.target.checked
      ? setState({
          ...state,
          [event.target.name]: event.target.checked,
        })
      : setState({
          ...state,
          [event.target.name]: event.target.value,
        })

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setAlignment(newAlignment)
  }
  const { name, email, design, payment, about, other, message } = state
  const checkbox = "text-xs sp:!ml-[20px] mt-2 tablet:mt-0 !rounded-[30px]"
  const checkboxColor = {
    "color": info?.color,
    "&.Mui-checked": {
      color: info?.color,
    },
  }
  // eslint-disable-next-line consistent-return
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (state.sucssess)
      return setState({
        ...state,
        sucssess:
          "すでに送信済みです。再度送信したい場合は再読み込みしてください",
      })
    const portalId = "22009101"
    const feare = Object.keys(state)
      .filter((key) => state[key] === true)
      .join(";")
    let formGuid
    let data
    // eslint-disable-next-line no-unused-expressions
    router.pathname === "/"
      ? (formGuid = "e749674b-e2fa-4b2e-b50e-632afbc60e56")
      : (formGuid = "9ebe808f-3f91-4c39-96ec-f9864b8920e5")
    // eslint-disable-next-line no-unused-expressions
    router.pathname === "/"
      ? (data = {
          portalId,
          formGuid,
          fields: [
            {
              name: "name",
              value: name,
            },
            {
              name: "email",
              value: user?.email || email,
            },
            {
              name: "badget",
              value: alignment,
            },
            {
              name: "message",
              value: message,
            },
          ],
        })
      : (data = {
          portalId,
          formGuid,
          fields: [
            {
              name: "email",
              value: user?.email || email,
            },
            {
              name: "feare",
              value: feare,
            },
            {
              name: "message",
              value: message,
            },
          ],
        })

    await postData({
      url: `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
      data,
    }).then(() => {
      setState({
        ...state,
        sucssess: "送信完了しました",
      })
    })
  }
  return (
    <Container className="w-9/10">
      {router.pathname === "/" && (
        <>
          <Typography variant="h3" className="text-xs mb-2 ml-2 fadein">
            飲食店のウェブでのブランディングやマーケティングについて
          </Typography>
          <Typography variant="h2" className="text-lg mb-2 font-bold fadein">
            ご気軽にご相談ください !
          </Typography>
        </>
      )}
      <form onSubmit={handleSubmit}>
        <FormGroup>
          {router.pathname === "/" && (
            <>
              <FormControl className="mt-3">
                <InputLabel
                  className="text-black text-[12px] leading-5"
                  shrink
                  htmlFor="name"
                >
                  名前・会社・その他活動名
                </InputLabel>
                <TextField
                  placeholder="starbucks Japan 佐々木"
                  className="mt-4"
                  id="name"
                  type="name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl className="mt-3">
                <InputLabel
                  className="text-black text-[12px] leading-5"
                  shrink
                  htmlFor="email"
                >
                  Email
                </InputLabel>
                <TextField
                  placeholder="sasaki@starbucks.co.jp"
                  className="mt-4"
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </FormControl>
            </>
          )}
          {router.pathname === "/" ? (
            <FormControl className="mt-3">
              <InputLabel
                className="text-black text-[12px] leading-5"
                shrink
                htmlFor="badget"
              >
                予算
              </InputLabel>
              <ToggleButtonGroup
                id="badget"
                className="flex-wrap tablet:mt-4 mt-1"
                value={alignment}
                exclusive
                onChange={handleAlignment}
              >
                <ToggleButton
                  value="2"
                  className="mt-1 tablet:mt-0 !rounded-[30px]"
                >
                  ～¥20,000
                </ToggleButton>
                <ToggleButton
                  value="2-5"
                  className="sp:!ml-[20px] mt-2 tablet:mt-0 !rounded-[30px]"
                >
                  ¥20,000～¥50,000
                </ToggleButton>
                <ToggleButton
                  value="5"
                  className="sp:!ml-[20px] mt-2 tablet:mt-0 !rounded-[30px]"
                >
                  ¥50,000～
                </ToggleButton>
              </ToggleButtonGroup>
            </FormControl>
          ) : (
            <FormControl>
              <FormLabel
                className="text-black text-sm leading-5 my-4"
                // shrink
                htmlFor="kind"
              >
                お困りの内容
              </FormLabel>
              <FormControlLabel
                className={checkbox}
                control={
                  <Checkbox
                    sx={checkboxColor}
                    checked={design}
                    onChange={handleChange}
                    name="design"
                  />
                }
                label="サイトのデザインについて"
              />

              <FormControlLabel
                className={checkbox}
                control={
                  <Checkbox
                    sx={checkboxColor}
                    checked={payment}
                    onChange={handleChange}
                    name="payment"
                  />
                }
                label="お支払いについて"
              />
              <FormControlLabel
                className={checkbox}
                control={
                  <Checkbox
                    sx={checkboxColor}
                    checked={about}
                    onChange={handleChange}
                    name="about"
                  />
                }
                label="お店の情報について"
              />
              <FormControlLabel
                className={checkbox}
                control={
                  <Checkbox
                    sx={checkboxColor}
                    checked={other}
                    onChange={handleChange}
                    name="other"
                  />
                }
                label="その他"
              />
            </FormControl>
          )}
          <FormControl className="mt-8">
            <InputLabel
              className="text-black text-sm leading-5"
              shrink
              htmlFor="お問い合わせ内容"
            >
              お問い合わせ内容
            </InputLabel>
            <TextField
              placeholder="近頃、飲食店を開業予定でウェブサイト作成を検討…"
              className="mt-4 inline-flex"
              id="outlined-multiline-static message"
              name="message"
              multiline
              rows={4}
              value={message}
              onChange={handleChange}
            />
            {/* <TextField
                className="mt-4 inline-flex tablet:hidden"
                id="outlined-multiline-static message"
                name="message"
                multiline
                rows={1}
                value={}
                defaultValue="近頃、飲食店を開業予定でウェブサイト作成を検討…"
              /> */}
          </FormControl>
          <Button
            type="submit"
            className="bg-black text-white rounded-full px-5 normal-case hover:bg-black hover:opacity-50 my-6 w-1/2 max-w-[180px]"
          >
            send
          </Button>
        </FormGroup>
        {state.sucssess && (
          <Typography
            align="justify"
            className="self-center ml-6 mt-4 text-color font-bold text-xs"
          >
            {state.sucssess}
          </Typography>
        )}
      </form>
    </Container>
  )
}
