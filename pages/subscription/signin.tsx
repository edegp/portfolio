import Link from "next/link"
import Head from "next/head"
import { useRouter } from "next/router"
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs"
import { Provider } from "@supabase/supabase-js"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import OutlinedInput from "@mui/material/OutlinedInput"
import InputLabel from "@mui/material/InputLabel"
import InputAdornment from "@mui/material/InputAdornment"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import FormControl from "@mui/material/FormControl"
import IconButton from "@mui/material/IconButton"
import { useState, FormEvent } from "react"
import { useUser } from "../../utils/useUser"
import Facebook from "../../components/icons/Facebook"
import Google from "../../components/icons/Google"
import LoadingDots from "../../components/ui/LoadingDots"
import Container from "../../components/container"

export default function SignIn() {
  const router = useRouter()
  const { user, isLoading, subscription, userDetails } = useUser()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginUser, setloginUser] = useState(false)
  const [message, setMessage] = useState<{ type?: string; content?: string }>({
    type: "",
    content: "",
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const handleSignin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage({})
    const { error, user: loginUser } = await supabaseClient.auth.signIn({
      email,
      password,
    })
    if (error) {
      setMessage({
        type: "error",
        content:
          error.message === "Invalid login credentials"
            ? "ご入力のメールアドレスは登録されていません。"
            : "",
      })
    }
    if (!password) {
      setMessage({
        type: "note",
        content: "パスワードを入力してください",
      })
    }
    subscription ?? router.push("/subscription/account")
    setLoading(false)
  }

  const handleOAuthSignIn = async (provider: Provider) => {
    setLoading(true)
    const { error } = await supabaseClient.auth.signIn(
      {
        provider,
      },
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
      email
    )
    if (data) {
      setMessage({
        type: "note",
        content: "リセット用のメールを送信しました。",
      })
    }
  }

  if (user) router.replace("/subscription")
  return (
    <>
      <Head>
        <title>ANful</title>
      </Head>
      <Container>
        <Box className="system py-[20vh] section">
          <div className="flex justify-center height-screen-helper">
            <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
              <div className="flex flex-col space-y-4">
                {message.content && (
                  <div
                    className={`${
                      message.type === "error"
                        ? "text-pink-500"
                        : "text-green-500"
                    } border ${
                      message.type === "error"
                        ? "border-pink-500"
                        : "border-green-500"
                    } p-3`}
                  >
                    {message.content}
                  </div>
                )}
                <form
                  onSubmit={handleSignin}
                  className="flex flex-col space-y-4"
                >
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-email">Email</InputLabel>
                    <OutlinedInput
                      id="outlined-email"
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                    disabled={password?.length < 8 || email?.length === 0}
                  >
                    {isLoading || loading ? <LoadingDots /> : "サインイン"}
                  </Button>
                </form>
                <span className="pt-1 text-center text-sm">
                  <span className="text-black text-xs">初めての方はこちら</span>

                  <Button>
                    <Link href="/subscription">サインアップ</Link>
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
                  className="border-t border-zinc-600 flex-grow mr-3"
                  aria-hidden="true"
                />
                <div className="text-zinc-400">Or</div>
                <div
                  className="border-t border-zinc-600 flex-grow ml-3"
                  aria-hidden="true"
                />
              </div>
              <Button
                className="mt-4 py-2  bg-white"
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
                className="mt-3 rounded-md pl-[6px] pr-[8px] py-0 bg-white"
                variant="contained"
                type="submit"
                disabled={loading}
                onClick={() => handleOAuthSignIn("google")}
              >
                <Google />
                <span className="ml-[10px] text-gray-600">
                  SIGN IN WITH GOOGLE
                </span>
              </Button>
            </div>
          </div>
        </Box>
      </Container>
    </>
  )
}
