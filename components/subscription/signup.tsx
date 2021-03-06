import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import { useUser } from "../../utils/useUser";
import SignIn from "./signin";
import LoadingDots from "../ui/LoadingDots";
import { updateUserName, supabase } from "../../utils/supabase-client";
import Facebook from "../icons/Facebook";
import Google from "../icons/Google";
import Link from "../Link";
import { User } from "../../types";
import { getURL } from "../../utils/helpers";

export default function SignUp({
  handleNext,
  // info, updateInfo,
  activeStep,
}) {
  const { user, isLoading, info, setInfo } = useUser();
  const [newUser, setNewUser] = useState<User | null>(null);
  const [signin, setSignin] = useState(false);
  const updateSignin = (e) => setSignin(e);
  const [message, setMessage] = useState<{ type?: string; content?: string }>({
    type: "",
    content: "",
  });
  const [password, setPassword] = useState("");

  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
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
    await setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
        content:
          "????????????????????????????????????????????????????????????URL???????????????????????????????????????",
      });
    }
    setLoading(false);
  };

  const handleOAuthSignIn = async (provider: Provider) => {
    setLoading(true);
    const { error } = await supabase.auth.signIn(
      { provider },
      {
        redirectTo: `${window.location.origin}/subscription`,
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
        <SignIn updateSignin={updateSignin} />
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
                  } p-3 text-[13px]`}
                >
                  {message.content === "User already registered"
                    ? "?????????????????????????????????????????????????????????"
                    : message.content === "Signup requires a valid password"
                    ? "???????????????????????????????????????????????????"
                    : message.content.startsWith(
                        "For security purposes, you can only request this after"
                      )
                    ? "???????????????????????????," +
                      message.content.replace(/[^0-9]/g, "") +
                      "???????????????????????????????????????????????????????????????????????????"
                    : message.content}
                </div>
              )}
              <form onSubmit={handleSignup} className="flex flex-col space-y-4">
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
                  className="!bg-[#04ac4d] text-white hover:opacity-70 w-vw-70 laptop:justify-self-end rounded-3 text-sm whitespace-nowrap px-10 justify-self-center"
                  variant="slim"
                  type="submit"
                >
                  {isLoading || loading ? (
                    <LoadingDots />
                  ) : (
                    "?????????????????????????????????"
                  )}
                </Button>
              </form>
              <span className="pt-1 text-center text-sm">
                <span className="text-zinc-600 text-xs">
                  ????????????????????????????????????????????????
                </span>
                <Button onClick={() => setSignin(true)}>???????????????</Button>
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
              className="mt-4  py-2  bg-white"
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
              className="mt-3 rounded-md pl-[6px] pr-[8px] py-0  bg-white"
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
