import { useState } from "react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "./Link";
import { updateUserName } from "../utils/supabase-client";
import { useUser } from "@supabase/supabase-auth-helpers/react";
import SignIn from "./signin";

export default function SignUp({
  setNewUser,
  setActiveStep,
  info,
  setInfo,
  jsx,
  activeStep,
}) {
  const { user } = useUser();
  const [signin, setSignin] = useState(false);
  const [message, setMessage] = useState<{ type?: string; content?: string }>({
    type: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSignin = (e) => {
    e.preventDefault();
    setSignin(true);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };
  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage({});
    console.log(e.target.elements.email.value);
    console.log(e.target.elements.password.value);
    await setInfo((prev) => ({
      ...prev,
      ["email"]: e.target.elements.email.value,
      ["password"]: e.target.elements.password.value,
    }));
    console.log(info);
    const { error, user: createdUser } = await supabaseClient.auth.signUp({
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
  if (signin)
    return (
      <SignIn
        info={info}
        setInfo={setInfo}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        setSignin={setSignin}
      />
    );
  // useEffect(() => {});
  return (
    <div className="flex justify-center height-screen-helper">
      <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
        <form onSubmit={handleSignup} className="flex flex-col space-y-4">
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
          <TextField
            id="email"
            className="my-vw-6"
            name="email"
            label="email"
            type="email"
            // onChange={handleChange}
            // value={info.email}
          />
          <TextField
            id="password"
            className="my-vw-6"
            name="password"
            label="password"
            type="password"
            // onChange={handleChange}
            // value={info.password}
          />
          <div className="pt-2 w-full flex flex-col">
            <Button
              className="!bg-[#04ac4d] text-white hover:opacity-70 w-vw-70 laptop:justify-self-end rounded-full text-sm whitespace-nowrap px-10 justify-self-center"
              variant="slim"
              type="submit"
            >
              Sign up
            </Button>
          </div>
          <span className="pt-1 text-center text-sm">
            <span className="text-zinc-200">Do you have an account?</span>
            <br />
            <Button onClick={handleSignin}>Sign in.</Button>
          </span>
        </form>
      </div>
    </div>
  );
}
