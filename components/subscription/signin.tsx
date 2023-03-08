import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs"
import { Provider } from "@supabase/supabase-js"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import OutlinedInput from "@mui/material/OutlinedInput"
import InputLabel from "@mui/material/InputLabel"
import InputAdornment from "@mui/material/InputAdornment"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import FormControl from "@mui/material/FormControl"
import IconButton from "@mui/material/IconButton"
import { useUser } from "../../utils/useUser"
import { useState, FormEvent } from "react"
import Google from "../icons/Google"
import Facebook from "../icons/Facebook"
import LoadingDots from "../ui/LoadingDots"

export default function SignIn({ updateSignin }) {
  const [loading, setLoading] = useState(false)
  const { user, isLoading, subscription, info, setInfo } = useUser()
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState<{ type?: string; content?: string }>({
    type: "",
    content: "",
  })
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target
    const { value } = event.target
    setInfo((prev) => ({ ...prev, [name]: value }))
  }
  const handleSignin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage({})
    const formElements = (e.target as HTMLFormElement).elements
    await setInfo((prev) => ({
      ...prev,
      email: (formElements.namedItem("email") as HTMLInputElement).value,
    }))
    await setInfo((prev) => ({
      ...prev,
      password: (formElements.namedItem("password") as HTMLInputElement).value,
    }))
    const { error, user: loginUser } = await supabaseClient.auth.signIn({
      email: info.email,
      password: info.password,
    })
    if (error) {
      setMessage({
        type: "error",
        content:
          error.message === "Invalid login credentials"
            ? "ご入力のメールアドレスは登録されていません。"
            : error.message,
      })
    }
    if (!info.password) {
      setMessage({
        type: "note",
        content: "Check your email for the magic link.",
      })
    }
    setLoading(false)
  }
  const handleOAuthSignIn = async (provider: Provider) => {
    setLoading(true)
    const { error } = await supabaseClient.auth.signIn(
      { provider },
      {
        redirectTo: `${window.location.origin}/subscription`,
      }
    )
    if (error) {
      setMessage({ type: "error", content: error.message })
    }
    setLoading(false)
  }

  const handlePassword = async () => {
    const { data, error } = await supabaseClient.auth.api.resetPasswordForEmail(
      info.email
    )
    if (data) {
      setMessage({
        type: "note",
        content: "リセット用のメールを送信しました。",
      })
    }
  }
  if (!user && !loading)
    return (
      <div className="flex justify-center height-screen-helper">
        <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
          <div className="flex flex-col space-y-4">
            {message.content && (
              <div
                className={`${
                  message.type === "error" ? "text-pink-500" : "text-green-500"
                } border ${
                  message.type === "error"
                    ? "border-pink-500"
                    : "border-green-500"
                } p-3`}
              >
                {message.content}
              </div>
            )}
            <form onSubmit={handleSignin} className="flex flex-col space-y-4">
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-email">Email</InputLabel>
                <OutlinedInput
                  id="outlined-email"
                  type="email"
                  name="email"
                  value={info.email}
                  onChange={handleChange}
                  label="Email"
                />
              </FormControl>
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={info.password}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  name="password"
                />
              </FormControl>
              <Button
                className="!bg-[#04ac4d] text-white hover:opacity-70 laptop:justify-self-end rounded-md text-sm whitespace-nowrap px-10 justify-self-center mt-1"
                variant="contained"
                type="submit"
                disabled={
                  info.password?.length < 8 ||
                  info.email?.length === 0 ||
                  isLoading
                }
              >
                {isLoading || subscription ? <LoadingDots /> : "サインイン"}
              </Button>
            </form>
            <span className="pt-1 text-center text-xs">
              <span className="text-zinc-600">初めての方はこちら↓</span>
              <br />
              <Button
                className="font-semibold  cursor-pointer"
                onClick={() => updateSignin(false)}
              >
                アカウントを作成
              </Button>
              <Button onClick={handlePassword}>
                パスワードをお忘れの方はこちら
              </Button>
              <br />
              <span className="text-black text-[14px]">
                ※上のボックスにメールを入力してクリック!
              </span>
            </span>
          </div>

          <div className="flex items-center my-6">
            <div
              className="border-t border-zinc-600 flex-grow mr-3 "
              aria-hidden="true"
            />
            <div className="text-zinc-400">Or</div>
            <div
              className="border-t border-zinc-600 flex-grow ml-3"
              aria-hidden="true"
            />
          </div>
          <Button
            className="mt-4  py-2  bg-white"
            variant="contained"
            type="submit"
            disabled={loading}
            onClick={() => handleOAuthSignIn("facebook")}
          >
            <Facebook />
            <span className="ml-[20px] text-gray-600">
              SIGN IN WITH Facebook
            </span>
          </Button>
          <Button
            className="mt-3 rounded-md pl-[6px] pr-[8px] py-0  bg-white"
            variant="contained"
            type="submit"
            disabled={loading}
            onClick={() => handleOAuthSignIn("google")}
          >
            <Google />
            <span className="ml-[10px] text-gray-600">SIGN IN WITH GOOGLE</span>
          </Button>
        </div>
      </div>
    )

  return (
    <div className="m-6">
      <LoadingDots />
    </div>
  )
}
