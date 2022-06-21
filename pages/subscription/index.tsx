import { GetStaticPropsResult } from "next";
import { useState, useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  PaymentRequestButtonElement,
  CardElement,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { SliderPicker } from "react-color";
import { User } from "@supabase/supabase-auth-helpers/nextjs";
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
import LoadingDots from "../../components/ui/LoadingDots";
import Container from "../../components/container";
import Header from "../../components/header";
import Link from "../../components/Link";
import Plan from "../../components/Plan";
import SignUp from "../../components/subscription/signup";
import SignIn from "../../components/subscription/signin";
import SubscriptionLayout from "../../components/subscription/SubscriptionLayout";
import SubscriptionForm from "../../components/subscription/Subscription";
import ToggleButton from "../../components/subscription/toggleButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Footer from "../../components/footer";

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
    fields: { purpose: "サイトを利用する目的をお教えください" },
  },
  {
    name: "情報",
    fields: {
      site_name: "サイト名",
      favorite: "以前見て感動、もしくはこんなサイトがいいと思ったサイトのURL",
      google: "ご自身のお店のgoogle mapのURL",
      other: "その他ご要望",
    },
  },
  {
    name: "プラン",
    fields: {},
  },
  {
    name: "お支払い",
    fields: {},
  },
];

export default function Register({ products }) {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const updateActiveStep = (e) => setActiveStep(e);
  const [plan, setPlan] = useState(
    Object.keys(router.query).length !== 0 ? router.query : "basic"
  );
  const updatePlan = (e) => setPlan(e.target.value);
  const [messages, _setMessages] = useState("");
  const [intent, setIntent] = useState(null);
  const updateIntent = (e) => setIntent(e);
  const [message, setMessage] = useState<{ type?: string; content?: string }>({
    type: "",
    content: "",
  });
  const { user, isLoading, subscription, canceled, info, setInfo } = useUser();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const [customer, setCustomer] = useState("");
  const [subscriptionId, setSubscriptionId] = useState("");
  const [update, setUpdate] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const price = products.find((product) => product.name === plan)?.prices[0];
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
  const handleUpdate = () => {
    setUpdate(true);
  };
  const handleClose = () => {
    setUpdate(false);
    setLoading(false);
  };
  const handleRenew = async () => {
    setLoading(true);
    const price = products.find((product) => product.name === plan).prices[0];
    let { customer, clientSecret, default_payment_method } = await postData({
      url: "/api/create-subscription",
      data: { price, subscriptionId: canceled.id },
    });
    if (clientSecret) {
      setClientSecret(clientSecret);
    }
    let { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: default_payment_method,
    });
    if (error) console.log(error);
    setLoading(false);
  };
  if (
    !clientSecret &&
    canceled &&
    !isLoading &&
    activeStep === 4 &&
    plan &&
    !loading &&
    !update
  ) {
    handleUpdate();
  }
  useEffect(() => {
    if (
      subscription?.status === "active" ||
      subscription?.status === "trialing" ||
      intent?.status === "succeeded"
    ) {
      router.push("/subscription/account");
    }
  }, [subscription, intent]);
  const jsx = steps.map((step) =>
    Object.keys(step.fields).length !== 0 ? (
      <FormGroup className="mb-6  grid gap-y-6">
        {Object.entries(step.fields).map(([key, value]) => {
          return (
            <TextField
              key={key}
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
      user && !subscription && !loading && !isLoading ? (
        handleUser()
      ) : isLoading && loading ? (
        <div className="h-12 mb-6">
          <LoadingDots />
        </div>
      ) : (
        <SignUp
          // info={info}
          // updateInfo={updateInfo}
          activeStep={activeStep}
          handleNext={handleNext}
        />
      )
    ) : step === 1 ? (
      <>
        {jsx[1]}
        <Box className="my-12">
          <Typography
            className="text-xs font-bold text-color mb-8"
            gutterBottom
          >
            あなたが希望するサイトのメインカラーを教えてください。
          </Typography>
          <SliderPicker color={info.color} onChange={handleColor} />
        </Box>
      </>
    ) : step === 2 ? (
      jsx[2]
    ) : step === 3 ? (
      <Plan
        products={products}
        className="my-0 tablet:mb-16"
        updatePlan={updatePlan}
      />
    ) : step === 4 ? (
      <SubscriptionForm
        plan={plan}
        products={products}
        info={info}
        intent={intent}
        updateIntent={updateIntent}
        handleBack={handleBack}
      />
    ) : (
      console.log("Unknown step")
    );
  let container = "";
  if (activeStep === 1 || activeStep === 2 || activeStep === 4) {
    container = "tablet:my-30 sp:my-24 my-0 max-w-lg p-3 m-auto w-90";
  } else {
    container = "tablet:my-30 sp:my-24 my-0";
  }
  const primaryColor = getRGBColor(info.color, "primary");
  return (
    <>
      <Head>
        <title>ANful</title>
        <style>:root {`{${primaryColor}}`}</style>
      </Head>
      <Container>
        {loading || subscription ? (
          <div className="text-center absolute top-[calc(50%-50px)] left-[calc(50%-50px)]">
            <LoadingDots c="#333" s="100px" />
          </div>
        ) : (
          <>
            <Box className="system tablet:pt-[18vh] sp:pt-[14vh] pt-[9vh]">
              <ToggleButton className="items-center mr-6  fixed top-[calc(4vw-5px)] right-h-w p-8 z-20" />
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
                        {loading ? (
                          <div className="h-12 mb-6">
                            <LoadingDots />
                          </div>
                        ) : (
                          "続ける"
                        )}
                      </Button>
                    </>
                  )}
                  <Footer />
                </Box>
              </MuiContainer>
            </Box>
          </>
        )}
      </Container>
      <Dialog
        open={update}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="text-sm">
          {`お帰りなさい。${plan}プランで再度登録しますか？`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={handleRenew} autoFocus>
            登録する
          </Button>
        </DialogActions>
      </Dialog>
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
