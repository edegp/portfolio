import { useState, useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useUser } from "@supabase/supabase-auth-helpers/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import MuiContainer from "@mui/material/Container";
import Container from "../../components/container";
import Plan from "../../components/Plan";
import Header from "../../components/header";
import Link from "../../components/Link";
import { Product } from ".././types";
import { GetStaticPropsResult } from "next";
import { getActiveProductsWithPrices } from "../../utils/supabase-client";
import { upsertInfo } from "../../utils/supabase-admin";
import { postData } from "../../utils/helpers";
import { updateUserName } from "../../utils/supabase-client";
import SignUp from "../../components/signup";
import SignIn from "../../components/signin";
import Subscription from "../../components/subscription";
import ToggleButton from "../../components/toggleButton";

interface Props {
  products: Product[];
}

const steps = [
  {
    name: "会員登録",
    fields: { email: "メールアドレス", password: "パスワード" },
  },
  {
    name: "目的",
    fields: { purpose: "ご利用目的" },
  },
  {
    name: "お店の情報",
    fields: {
      site_name: "サイト名",
      favorite: "以前見て感動、もしくはこんなサイトがいいと思ったサイトURL",
      google: "google mapのURL",
      other: "その他ご要望",
    },
  },
  {
    name: "プラン",
    fields: {},
  },
  {
    name: "お支払い方法",
    fields: {},
  },
];

export default function Register({ products }) {
  const router = useRouter();
  const [newUser, setNewUser] = useState<User | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [plan, setPlan] = useState("basic");
  const [info, setInfo] = useState({
    email: "",
    password: "",
    purpose: "",
    site_name: "",
    favorite: "",
    google: "",
    other: "",
  });
  const [messages, _setMessages] = useState("");
  const [paymentIntent, setPaymentIntent] = useState("");

  const [message, setMessage] = useState<{ type?: string; content?: string }>({
    type: "",
    content: "",
  });
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handleUser = () => {
    setInfo((prev) => ({
      ...prev,
      ["email"]: user.email || "",
      ["password"]: user.password || "",
    }));
    handleNext();
  };
  useEffect(() => {
    if (paymentIntent && paymentIntent.status === "succeeded") {
      router.push("/subscription/account");
    }
  }, [paymentIntent]);
  const jsx = steps.map((step) =>
    Object.keys(step.fields).length !== 0 ? (
      <FormGroup>
        {Object.entries(step.fields).map(([key, value]) => {
          return (
            <TextField
              key={key}
              className="my-vw-6"
              name={key}
              label={value}
              type={
                key === "password"
                  ? "password"
                  : key === "email"
                  ? "email"
                  : "text"
              }
              value={info[`${key}`]}
              onChange={handleChange}
            />
          );
        })}
      </FormGroup>
    ) : (
      <></>
    )
  );
  const getStepContent = (step) =>
    step === 0 ? (
      !user ? (
        <SignUp
          jsx={jsx}
          info={info}
          setInfo={setInfo}
          setNewUser={setNewUser}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      ) : (
        handleUser()
      )
    ) : step === 1 ? (
      jsx[1]
    ) : step === 2 ? (
      jsx[2]
    ) : step === 3 ? (
      <Plan products={products} />
    ) : step === 4 ? (
      <Subscription
        user={user}
        plan={plan}
        products={products}
        info={info}
        setPaymentIntent={setPaymentIntent}
      />
    ) : (
      console.log("Unknown step")
    );

  return (
    <>
      <Head>
        <title>ANful</title>
      </Head>
      <Container>
        <Box className="system laptop:pt-[18vh] pt-[14vh] section">
          <MuiContainer>
            <ToggleButton />
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((step) => (
                <Step key={step.name}>
                  <StepLabel>{step.name}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {getStepContent(activeStep)}
            {activeStep !== 0 && activeStep !== 4 && (
              <>
                <Button onClick={handleBack}>Back</Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  className="!bg-[#04ac4d] text-white hover:opacity-70 w-vw-70 laptop:justify-self-end rounded-full text-sm whitespace-nowrap px-10 justify-self-center"
                >
                  Next
                </Button>
              </>
            )}
          </MuiContainer>
        </Box>
      </Container>
    </>
  );
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const products = await getActiveProductsWithPrices();
  return {
    props: {
      products,
    },
    revalidate: 60,
  };
}
