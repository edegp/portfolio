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
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { postData } from "../../utils/helpers";
import { useUser } from "../../utils/useUser";
import Credit from "../../public/image/credit.jpg";
import LoadingDots from "../ui/LoadingDots";
import Link from "../Link";
import Terms from "../terms";

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
  const [message, setMessage] = useState<{ type?: string; content?: string }>({
    type: "",
    content: "",
  });
  const [clientSecret, setClientSecret] = useState("");
  const [customer, setCustomer] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    number: "",
    expiry: "",
    cvc: "",
  });
  const [card, setCard] = useState({
    number: false,
    expiry: false,
    cvc: false,
  });
  const { user, subscription, isLoading, canceled } = useUser();
  const [consent, setConsent] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");

  const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  const stripe = useStripe();
  const elements = useElements();
  if (!stripe || !elements) {
    return "";
  }
  const price = products.find((product) => product.name === plan).prices[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", content: "" });
    if (Object.values(card).includes(false) || !consent)
      return setMessage({
        type: "error",
        content: "???????????????????????????????????????",
      });
    setLoading(true);
    const cardNumberElement = elements.getElement(CardNumberElement);
    await postData({
      url: "/api/create-subscription",
      data: { price },
    })
      .then(async ({ customer, clientSecret }) => {
        if (plan === "Premium") {
          const { paymentIntent, error } = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: cardNumberElement,
                billing_details: {
                  name,
                },
              },
            }
          );
          updateIntent(paymentIntent);
          if (error) {
            setMessage({
              type: "error",
              content:
                error.message === "Internal Server Error"
                  ? "???????????????"
                  : error.message,
            });
          }
        } else {
          const { setupIntent, error } = await stripe.confirmCardSetup(
            clientSecret,
            {
              payment_method: {
                card: cardNumberElement,
                billing_details: {
                  name,
                },
              },
            }
          );
          if (error) {
            setMessage({
              type: "error",
              content:
                e.message === "Internal Server Error"
                  ? "???????????????"
                  : e.message,
            });
          } else {
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
        }
      })
      .catch((error) =>
        setMessage({
          type: "error",
          content:
            error.message === "Internal Server Error"
              ? "??????????????????????????????????????????????????????????????????????????????"
              : error.message,
        })
      );
    setLoading(false);
  };
  const handleElementChange = ({ error, elementType }) => {
    if (error) {
      elementType === "cardNumber"
        ? setErrorMessage({ ...errorMessage, ["number"]: error.message })
        : elementType === "cardExpiry"
        ? setErrorMessage({ ...errorMessage, ["expiry"]: error.message })
        : elementType === "cardCvc"
        ? setErrorMessage({ ...errorMessage, ["cvc"]: error.message })
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
      elementType === "cardNumber"
        ? setCard({
            ...card,
            ["number"]: true,
          })
        : elementType === "cardExpiry"
        ? setCard({
            ...card,
            ["expiry"]: true,
          })
        : elementType === "cardCvc"
        ? setCard({ ...card, ["cvc"]: true })
        : setCard({
            number: true,
            expiry: true,
            cvc: true,
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
          ????????????????????????
          <br />
          ???????????????????????????????????????
        </h1>
        {/* <p className="text-sm">4242424242424242</p> */}
        {/* <p className="text-sm">4000002500003155</p> */}
        <Box className="">
          <Image src={Credit} height={50} width={420} />
        </Box>
        <hr />
        <form onSubmit={handleSubmit}>
          <Grid className="grid grid-cols-4 gap-x-6 mt-2">
            <FormControl
              className="grid grid-cols-4 gap-x-6 col-span-4"
              variant="standard"
            >
              <TextField
                className="col-span-4"
                autoComplete="cc-name"
                fullWidth
                required
                name="cardName"
                value={name}
                onChange={({ target }) => setName(target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="dense"
                label="??????"
              />
              <TextField
                className="col-span-4"
                fullWidth
                required
                name="cardNumber"
                autoComplete="cc-number"
                label="???????????????"
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
                required
                ame="cardExpiration"
                autoComplete="cc-exp"
                label="????????????"
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
                required
                label="??????????????????????????????"
                InputLabelProps={{
                  shrink: true,
                }}
                margin="dense"
                error={Boolean(errorMessage?.cvc)}
                helperText={
                  Boolean(errorMessage?.cvc)
                    ? errorMessage.cvc || "Invalid"
                    : ""
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
              <FormControlLabel
                control={
                  <Checkbox
                    checked={consent}
                    onChange={() => setConsent(!consent)}
                    name="consent"
                    required
                  />
                }
                className="col-span-4 mr-0"
                label={
                  <Typography>
                    <Button
                      className="col-span-1 self-center text-[#888888]"
                      onClick={handleClickOpen("paper")}
                    >
                      ????????????
                    </Button>
                    ????????????????????????
                  </Typography>
                }
              />
            </FormControl>
            <Dialog
              open={open}
              onClose={handleClose}
              scroll={scroll}
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description"
              maxWidth="lg"
            >
              <DialogTitle id="scroll-dialog-title">????????????</DialogTitle>
              <DialogContent dividers={scroll === "paper"}>
                <DialogContentText
                  id="scroll-dialog-description"
                  ref={descriptionElementRef}
                  tabIndex={-1}
                >
                  <Terms />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>??????</Button>
                <Button
                  onClick={() => {
                    setConsent(true);
                    handleClose();
                  }}
                >
                  ????????????
                </Button>
              </DialogActions>
            </Dialog>
            {message.content && (
              <div
                className={`${
                  message.type === "error" ? "text-pink-500" : "text-green-500"
                } border ${
                  message.type === "error"
                    ? "border-pink-500"
                    : "border-green-500"
                } p-3 text-[13px] col-span-4`}
              >
                {message.content === "User already registered"
                  ? "?????????????????????????????????????????????????????????"
                  : message.content === "Signup requires a valid password"
                  ? "???????????????????????????????????????????????????"
                  : message.content}
              </div>
            )}
            {info ? (
              <>
                <Button onClick={() => handleBack()}>??????</Button>
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
                  {loading ? <LoadingDots /> : "????????????"}
                </Button>
                <Typography className="text-[#888888] text-xs text-center col-span-4">
                  ????????????????????????????????????SSL(?????????????????????)???????????????????????????
                </Typography>
              </>
            ) : (
              <>
                <Button>
                  <Link href="/subscription/customer-portal">??????</Link>
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  disabled={s}
                  className="!bg-[#04ac4d] text-white hover:opacity-70 w-vw-70 rounded-md text-sm whitespace-nowrap px-10 self-center col-start-2 col-span-2 my-8"
                >
                  {loading ? <LoadingDots /> : "????????????"}
                </Button>
                <Typography className="text-[#888888] text-xs text-center col-span-4">
                  ????????????????????????????????????SSL(?????????????????????)???????????????????????????
                </Typography>
              </>
            )}
          </Grid>
        </form>

        {paymentRequest && (
          <PaymentRequestButtonElement options={{ paymentRequest }} />
        )}
      </Container>
    </>
  );
}
