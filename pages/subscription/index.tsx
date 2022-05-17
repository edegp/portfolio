import { GetStaticPropsResult } from "next";
import { useState, useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
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
import InputLabel from "@mui/material/InputLabel";
import { SliderPicker } from "react-color";
import Container from "../../components/container";
import Plan from "../../components/Plan";
import Header from "../../components/header";
import Link from "../../components/Link";
import { Product } from ".././types";
import { useUser } from "../../utils/useUser";
import { getActiveProductsWithPrices } from "../../utils/supabase-client";
import { upsertInfo } from "../../utils/supabase-admin";
import {
  getRGBColor,
  // ,getAccessibleColor
} from "../../utils/color";
import { postData } from "../../utils/helpers";
import { updateUserName } from "../../utils/supabase-client";
import SignUp from "../../components/signup";
import SignIn from "../../components/signin";
import SubscriptionLayout from "../../components/SubscriptionLayout";
import Subscription from "../../components/subscription";
import ToggleButton from "../../components/toggleButton";
import { User } from "@supabase/supabase-auth-helpers/nextjs";
import LoadingDots from "../../components/ui/LoadingDots";

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
    fields: { purpose: "主なご利用目的" },
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
    color: "#333",
    site_name: "",
    favorite: "",
    google: "",
    other: "",
  });
  const [messages, _setMessages] = useState("");
  const [setupIntent, setSetupIntent] = useState("");

  const [message, setMessage] = useState<{ type?: string; content?: string }>({
    type: "",
    content: "",
  });
  const { user, isLoading, subscription, canceled } = useUser();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const stripe = useStripe();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };
  const handleNext = () => setActiveStep(activeStep + 1);

  const handleBack = () => setActiveStep(activeStep - 1);
  const handleUser = () => {
    setInfo((prev) => ({
      ...prev,
      ["email"]: user.email || "",
      ["password"]: user.password || "",
    }));
    handleNext();
  };
  const handleColor = (color, event) =>
    setInfo((prev) => ({
      ...prev,
      ["color"]: color.hex,
    }));
  const handleRenew = async () => {
    const price = products.find((product) => product.name === plan).prices[0];
    let { customer, clientSecret, subscriptionId, default_payment_method } =
      await postData({
        url: "/api/create-subscription",
        data: { price, canceled },
      });
    if (clientSecret) {
      setClientSecret(clientSecret);
    }
    console.log(default_payment_method);
    let { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: default_payment_method,
    });
    if (error) console.log(error);
  };
  if (
    !clientSecret &&
    canceled &&
    !isLoading &&
    activeStep === 4 &&
    plan &&
    !loading
  ) {
    setLoading(true);
    handleRenew();
  }
  useEffect(() => {
    if (
      subscription?.status === "active" ||
      subscription?.status === "trialing"
    ) {
      router.push("/subscription/account");
    }
  }, [subscription]);
  useEffect(() => {
    if (setupIntent && setupIntent.status === "succeeded") {
      router.push("/subscription/account");
    }
  }, [setupIntent]);
  const jsx = steps.map((step) =>
    Object.keys(step.fields).length !== 0 ? (
      <FormGroup>
        {Object.entries(step.fields).map(([key, value]) => {
          return (
            <TextField
              key={key}
              className="my-vw-3"
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
      <>
        {jsx[1]}
        <Box className="my-12">
          <Typography className="text-xs font-bold text-color" gutterBottom>
            サイトのメインカラー
          </Typography>
          <SliderPicker color={info.color} onChange={handleColor} />
        </Box>
      </>
    ) : step === 2 ? (
      jsx[2]
    ) : step === 3 ? (
      <Plan products={products} className="my-8" />
    ) : step === 4 ? (
      <Subscription
        plan={plan}
        products={products}
        info={info}
        setSetupIntent={setSetupIntent}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />
    ) : (
      console.log("Unknown step")
    );
  let container = "";
  if (activeStep === 1 || activeStep === 2 || activeStep === 4) {
    container = "mt-10 max-w-lg p-3 m-auto w-90";
  } else {
    container = "mt-10";
  }
  const primaryColor = getRGBColor(info.color, "primary");
  if (loading) {
    return (
      <div className="h-12 mb-6">
        <LoadingDots />
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>ANful</title>
        <style>:root {`{${primaryColor}`}</style>
      </Head>
      <Container>
        <Box className="system laptop:pt-[18vh] pt-[14vh] section">
          <ToggleButton />
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((step) => (
              <Step key={step.name}>
                <StepLabel>{step.name}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <MuiContainer>
            <Box className={container}>
              {getStepContent(activeStep)}
              {activeStep !== 0 && activeStep !== 4 && (
                <>
                  <Button onClick={handleBack}>戻る</Button>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    className="!bg-[#04ac4d] text-white hover:opacity-70 w-vw-70 laptop:justify-self-end rounded-md text-sm whitespace-nowrap px-10 justify-self-center"
                  >
                    続ける
                  </Button>
                </>
              )}
            </Box>
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
