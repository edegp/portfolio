import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, FormEvent } from "react";
import { useUser } from "@supabase/supabase-auth-helpers/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { Provider } from "@supabase/supabase-js";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Google from "../icons/Google";
import Facebook from "../icons/Facebook";
import { getURL } from "../../utils/helpers";
import { postData } from "../../utils/helpers";
import LoadingDots from "../ui/LoadingDots";
import Logo from "../icons/Logo";

export default function SignIn({
  info,
  setInfo,
  setActiveStep,
  activeStep,
  setSignin,
}) {
  const router = useRouter();
  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const { user, isLoading, subscription } = useUser();
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [loginUser, setloginUser] = useState(false);
  const [message, setMessage] = useState<{ type?: string; content?: string }>({
    type: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInfo((prev) => ({
      ...prev,
      [event.target?.name]: event.target?.value,
    }));
  const handleSignin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage({});
    setInfo((prev) => ({
      ...prev,
      ["email"]: e.target.elements.email.value,
      ["password"]: e.target.elements.password.value,
    }));
    const { error, user: loginUser } = await supabaseClient.auth.signIn(
      { email: info.email, password: info.password },
      { redirectTo: getURL() }
    );
    if (error) {
      setMessage({ type: "error", content: error.message });
    }
    if (!info.password) {
      setMessage({
        type: "note",
        content: "Check your email for the magic link.",
      });
    }
    if (subscription) {
      return router.push("/subscription/account");
    }
    if (loginUser) {
      setActiveStep(activeStep + 1);
    }
    setLoading(false);
  };

  const handleOAuthSignIn = async (provider: Provider) => {
    setLoading(true);
    const { error } = await supabaseClient.auth.signIn(
      { provider },
      {
        redirectTo: "/subscription",
      }
    );
    if (error) {
      setMessage({ type: "error", content: error.message });
    }
    setLoading(false);
  };

  if (!user && !loading)
    return (
      <>
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
              <form onSubmit={handleSignin} className="flex flex-col space-y-4">
                <TextField
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={info.email}
                  onChange={handleChange}
                  required
                />
                <TextField
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={info.password}
                  onChange={handleChange}
                  required
                />
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
                  {isLoading ? <LoadingDots /> : "Sign in"}
                </Button>
              </form>
              <span className="pt-1 text-center text-xs">
                <span className="text-zinc-200">Don't have an account?</span>
                <br />
                <Button
                  className="font-semibold  cursor-pointer"
                  onClick={() => setSignin(false)}
                >
                  Sign up.
                </Button>
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
              className="mt-4  py-2"
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
              className="mt-3 rounded-md pl-[6px] pr-[8px] py-0 "
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
      </>
    );

  return (
    <div className="m-6">
      <LoadingDots />
    </div>
  );
}
