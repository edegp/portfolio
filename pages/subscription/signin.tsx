import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState, FormEvent } from "react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { Provider } from "@supabase/supabase-js";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { getURL } from "../../utils/helpers";
import { postData } from "../../utils/helpers";
import { useUser } from "../../utils/useUser";
import Facebook from "../../components/icons/Facebook";
import Google from "../../components/icons/Google";
import LoadingDots from "../../components/ui/LoadingDots";
import Logo from "../../components/icons/Logo";
import Container from "../../components/container";

export default function SignIn() {
  const router = useRouter();
  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const { user, isLoading, subscription, userDetails } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, setloginUser] = useState(false);
  const [message, setMessage] = useState<{ type?: string; content?: string }>({
    type: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInfo((prev) => ({ ...prev, [event.target?.name]: event.target?.value }));
  const handleSignin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage({});
    const { error, user: loginUser } = await supabaseClient.auth.signIn({
      email,
      password,
    });
    if (error) {
      setMessage({ type: "error", content: error.message });
    }
    if (!password) {
      setMessage({
        type: "note",
        content: "パスワードを入力してください",
      });
    }
    subscription ?? router.push("/subscription/account");
    setLoading(false);
  };

  const handleOAuthSignIn = async (provider: Provider) => {
    setLoading(true);
    const { error } = await supabaseClient.auth.signIn({ provider });
    if (error) {
      setMessage({ type: "error", content: error.message });
    }
    setLoading(false);
  };

  const handlePassword = async () => {
    const { data, error } = await supabaseClient.auth.api.resetPasswordForEmail(
      email
    );
    if (data) {
      setMessage({
        type: "note",
        content: "リセット用のメールを送信しました。",
      });
    }
  };

  if (user) router.replace("/subscription");
  return (
    <>
      <Head>
        <title>ANful</title>
      </Head>
      <Container>
        <Box className="system laptop:pt-[20vh] pt-[14vh] section">
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
                  <TextField
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <TextField
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    className="!bg-[#04ac4d] text-white hover:opacity-70 laptop:justify-self-end rounded-md text-sm whitespace-nowrap px-10 justify-self-center mt-1"
                    variant="contained"
                    type="submit"
                    loading={loading}
                    disabled={password?.length < 8 || email?.length === 0}
                  >
                    {isLoading || loading ? <LoadingDots /> : "サインイン"}
                  </Button>
                </form>
                <span className="pt-1 text-center text-sm">
                  <span className="text-black text-xs">初めての方はこちら</span>
                  <Link href="/subscription">
                    <Button>サインアップ</Button>
                  </Link>
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
                ></div>
                <div className="text-zinc-400">Or</div>
                <div
                  className="border-t border-zinc-600 flex-grow ml-3"
                  aria-hidden="true"
                ></div>
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
  );
}
