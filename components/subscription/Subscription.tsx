import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  PaymentRequestButtonElement,
  CardElement,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { withPageAuth, getUser } from "@supabase/supabase-auth-helpers/nextjs";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { postData } from "../../utils/helpers";
import { useUser } from "../../utils/useUser";
import Credit from "../../public/image/credit.jpg";
import LoadingDots from "../ui/LoadingDots";
import Link from "../Link";

const CARD_NUMBER_OPTIONS = {
  placeholder: "",
  showIcon: true,
  iconStyle: "solid" as const,
  style: {
    base: {
      iconColor: "#6772e5",
      color: "#6772e5",
      fontWeight: "500",
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883",
      },
      "::placeholder": {
        color: "#6772e5",
      },
    },
    invalid: {
      iconColor: "#ef2961",
      color: "#ef2961",
    },
  },
};
const CARD_OPTIONS = {
  placeholder: "",
  style: {
    base: {
      iconColor: "#6772e5",
      color: "#6772e5",
      fontWeight: "500",
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883",
      },
      "::placeholder": {
        color: "#6772e5",
      },
    },
    invalid: {
      iconColor: "#ef2961",
      color: "#ef2961",
    },
  },
};

const StripeInput = React.forwardRef((props, inputRef) => {
  const { component: Component, ...other } = props;
  const elementRef = React.useRef();

  React.useImperativeHandle(inputRef, () => ({
    focus: () => elementRef.current.focus,
  }));

  return (
    <Component
      onReady={(element) => (elementRef.current = element)}
      {...other}
    />
  );
});

export default function SubscriptionForm({
  products,
  plan,
  info,
  handleBack,
  intent,
  updateIntent,
}) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [messages, _setMessages] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [customer, setCustomer] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    number: "",
    expiry: "",
    cvc: "",
  });
  const { user, subscription, isLoading, canceled } = useUser();
  const stripe = useStripe();
  const elements = useElements();
  if (!stripe || !elements) {
    return "";
  }
  const setMessage = (message) => {
    _setMessages(`${messages}\n\n${message}`);
  };
  const price = products.find((product) => product.name === plan).prices[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const cardNumberElement = elements.getElement(CardNumberElement);
    try {
      let { customer, clientSecret } = await postData({
        url: "/api/create-subscription",
        data: { price },
      });
      setCustomer(customer);
      setClientSecret(clientSecret);
      if (plan === "Premium") {
        const { paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: cardNumberElement,
              billing_details: {
                name: name,
              },
            },
          }
        );
        updateIntent(paymentIntent);
      } else {
        const { setupIntent } = await stripe.confirmCardSetup(clientSecret, {
          payment_method: {
            card: cardNumberElement,
            billing_details: {
              name,
            },
          },
        });
        const update = await postData({
          url: "/api/update-customer",
          data: {
            default_payment_method: setupIntent?.payment_method,
            customerId: customer,
            info,
          },
        });
        updateIntent(setupIntent);
      }
    } catch (error) {
      if (error) setMessage(error);
    }
    setLoading(false);
  };
  const handleElementChange = ({ elementType, error }) => {
    if (error) {
      elementType === "cardNumber"
        ? setErrorMessage((prev) => ({ ...prev, ["number"]: error.message }))
        : elementType === "cardExpiry"
        ? setErrorMessage((prev) => ({ ...prev, ["expiry"]: error.message }))
        : elementType === "cardCvc"
        ? setErrorMessage((prev) => ({ ...prev, ["cvc"]: error.message }))
        : setErrorMessage({
            number: "",
            expiry: "",
            cvc: "",
          });
    } else {
      setErrorMessage({
        number: "",
        expiry: "",
        cvc: "",
      });
    }
  };

  const getPaymentRequest = async () => {
    setLoading(true);
    try {
      const pr = await stripe.paymentRequest({
        country: "JP",
        currency: "jpy",
        total: {
          label: plan,
          amount: price.unit_amount,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });
      // Check the availability of the Payment Request API.
      await pr.canMakePayment().then((result) => {
        if (result) {
          setPaymentRequest(pr);
        }
      });
    } catch (err) {
      setMessage(err);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (plan && !subscription) getPaymentRequest();
  }, [plan, subscription]);
  if (!loading && paymentRequest) {
    paymentRequest.on("paymentmethod", async (ev) => {
      let { customer, clientSecret } = await postData({
        url: "/api/create-subscription",
        data: { price },
      });
      setCustomer(customer);
      setClientSecret(clientSecret);
      if (clientSecret) {
        if (plan !== "Premium") {
          const { setupIntent, error: confirmError } =
            await stripe.confirmCardSetup(
              clientSecret,
              { payment_method: ev.paymentMethod.id },
              { handleActions: false }
            );
          const update = await postData({
            url: "/api/update-customer",
            data: {
              default_payment_method: setupIntent.payment_method,
              customerId: customer,
              info,
            },
          });
        } else {
          const { paymentIntent, error: confirmError } =
            await stripe.confirmCardPayment(
              clientSecret,
              { payment_method: ev.paymentMethod.id },
              { handleActions: false }
            );
        }
        if (confirmError) {
          ev.complete("fail");
        } else {
          ev.complete("success");
          if (setupIntent.status === "requires_action") {
            const { error } = await stripe.confirmCardSetup(clientSecret);
            if (error) {
              // The payment failed -- ask your customer for a new payment method.
            } else {
              // The payment has succeeded.
            }
          } else {
            // The payment has succeeded.
          }
        }
      }
    });
  }
  return (
    <>
      <Container className="max-w-vw-64">
        <h1 className="text-sm leading-6  my-6">
          クレジットカード
          <br />
          またはデビットカードを選択
        </h1>
        {/* <p className="text-sm">4242424242424242</p> */}
        {/* <p className="text-sm">4000002500003155</p> */}
        <Box className="">
          <Image src={Credit} height={50} width={420} />
        </Box>
        <hr />
        <form onSubmit={handleSubmit}>
          <Grid className="grid grid-cols-4 gap-x-6">
            {info && (
              <>
                <TextField
                  className="col-span-4"
                  autoComplete="cc-name"
                  fullWidth
                  requires
                  name="cardName"
                  value={name}
                  onChange={({ target }) => setName(target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="dense"
                  label="名前"
                />
              </>
            )}
            <TextField
              className="col-span-4"
              fullWidth
              requires
              name="cardNumber"
              autoComplete="cc-number"
              label="カード番号"
              InputLabelProps={{
                shrink: true,
              }}
              margin="dense"
              error={Boolean(errorMessage?.number)}
              helperText={
                Boolean(errorMessage?.number)
                  ? errorMessage.number || "Invalid"
                  : ""
              }
              onChange={handleElementChange}
              InputProps={{
                inputProps: {
                  options: CARD_NUMBER_OPTIONS,
                  component: CardNumberElement,
                },
                inputComponent: StripeInput,
              }}
            />
            <TextField
              className="col-span-2"
              fullWidth
              requires
              ame="cardExpiration"
              autoComplete="cc-exp"
              label="有効期限"
              InputLabelProps={{
                shrink: true,
              }}
              margin="dense"
              error={Boolean(errorMessage?.expiry)}
              helperText={
                Boolean(errorMessage?.expiry)
                  ? errorMessage.expiry || "Invalid"
                  : ""
              }
              onChange={handleElementChange}
              InputProps={{
                inputProps: {
                  options: CARD_OPTIONS,
                  component: CardExpiryElement,
                },
                inputComponent: StripeInput,
              }}
            />
            <TextField
              className="col-span-2"
              fullWidth
              requires
              label="セキュリティーコード"
              InputLabelProps={{
                shrink: true,
              }}
              margin="dense"
              error={Boolean(errorMessage?.cvc)}
              helperText={
                Boolean(errorMessage?.cvc) ? errorMessage.cvc || "Invalid" : ""
              }
              onChange={handleElementChange}
              InputProps={{
                inputProps: {
                  options: CARD_OPTIONS,
                  component: CardCvcElement,
                },
                inputComponent: StripeInput,
              }}
            />
            {info ? (
              <>
                <Button onClick={() => handleBack()}>戻る</Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={
                    errorMessage.number ||
                    errorMessage.cvc ||
                    errorMessage.expriy ||
                    isLoading
                  }
                  className="!bg-[#04ac4d] text-white hover:opacity-70 w-vw-70 rounded-md text-sm whitespace-nowrap px-10 self-center col-start-2 col-span-2 my-8"
                >
                  {loading ? <LoadingDots /> : "登録する"}
                </Button>
              </>
            ) : (
              <>
                <Button>
                  <Link href="/subscription/customer-portal">戻る</Link>
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  disabled={s}
                  className="!bg-[#04ac4d] text-white hover:opacity-70 w-vw-70 rounded-md text-sm whitespace-nowrap px-10 self-center col-start-2 col-span-2 my-8"
                >
                  {loading ? <LoadingDots /> : "追加する"}
                </Button>
              </>
            )}
          </Grid>
          <div>{messages}</div>
        </form>
        {paymentRequest && (
          <PaymentRequestButtonElement options={{ paymentRequest }} />
        )}
      </Container>
    </>
  );
}
