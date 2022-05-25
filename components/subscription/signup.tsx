import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useUser } from "../../utils/useUser";
import SignIn from "./signin";
import { updateUserName, supabase } from "../../utils/supabase-client";
import Facebook from "../icons/Facebook";
import Google from "../icons/Google";
import Link from "../Link";
import { User } from "../../types";

export default function SignUp({ setActiveStep, info, setInfo, activeStep }) {
  const { user } = useUser();
  const [newUser, setNewUser] = useState<User | null>(null);
  const [signin, setSignin] = useState(false);
  const [message, setMessage] = useState<{ type?: string; content?: string }>({
    type: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    name === "email" ?? setEmail(value);
    name === "password" ?? setPassword(value);
    setInfo((prev) => ({ ...prev, [name]: value }));
  };
  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage({});
    await setInfo((prev) => ({
      ...prev,
      ["email"]: e.target.elements.email.value,
      ["password"]: e.target.elements.password.value,
    }));
    const { error, user: createdUser } = await supabase.auth.signUp({
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
    });
    if (error) {
      setMessage({ type: "error", content: error.message });
    }
    if (createdUser) {
      setNewUser(createdUser);
      setMessage({
        type: "note",
        content: "Check your email for the confirmation link.",
      });
      setActiveStep(activeStep + 1);
    }
    setLoading(false);
  };

  const handleOAuthSignIn = async (provider: Provider) => {
    setLoading(true);
    const { error } = await supabase.auth.signIn(
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
  return (
    <>
      {signin ? (
        <SignIn
          info={info}
          setInfo={setInfo}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          setSignin={setSignin}
        />
      ) : (
        <div className="flex justify-center height-screen-helper">
          <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80">
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
              <form onSubmit={handleSignup} className="flex flex-col space-y-4">
                <TextField
                  id="email"
                  className="my-vw-6"
                  name="email"
                  label="email"
                  type="email"
                  onChange={handleChange}
                />
                <TextField
                  id="password"
                  className="my-vw-6"
                  name="password"
                  label="password"
                  type="password"
                  onChange={handleChange}
                />
                <Button
                  className="!bg-[#04ac4d] text-white hover:opacity-70 w-vw-70 laptop:justify-self-end rounded-full text-sm whitespace-nowrap px-10 justify-self-center"
                  variant="slim"
                  type="submit"
                >
                  Sign up
                </Button>
              </form>
              <span className="pt-1 text-center text-sm">
                <span className="text-zinc-200">Do you have an account?</span>
                <Button onClick={() => setSignin(true)}>Sign in.</Button>
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
                SIGN UP WITH Facebook
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
                SIGN UP WITH GOOGLE
              </span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
