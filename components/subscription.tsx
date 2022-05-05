import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { postData } from "../utils/helpers";
import Button from "@mui/material/Button";

export default function Subscription({
  user,
  products,
  plan,
  info,
  setPaymentIntent,
}) {
  const [messages, _setMessages] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const setMessage = (message) => {
    _setMessages(`${messages}\n\n${message}`);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const cardElement = elements.getElement(CardElement);
    const price = products.find((product) => product.name === plan).prices[0];
    try {
      const { customer, clientSecret } = await postData({
        url: "/api/create-subscription",
        data: { price, info },
      });
      if (!clientSecret) console.log("cannot post subscription");
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });
      if (!paymentIntent) console.log("cannot post paymentIntent");
      const update = await postData({
        url: "/api/update-customer",
        data: {
          default_payment_method: paymentIntent.payment_method,
          customerId: customer,
          info,
        },
      });
      if (!update) console.log("cannot post updatePyament");
      setPaymentIntent(paymentIntent);
    } catch (error) {
      if (error) return alert((error as Error).message);
    }
  };
  return (
    <>
      <h1 className="text-lg mt-32">Subscribe</h1>
      <p className="text-lg">
        Try the successful test card: <span>4242424242424242</span>.
      </p>
      <p>
        Try the test card that requires SCA: <span>4000002500003155</span>.
      </p>
      <p>
        Use any <i>future</i> expiry date, CVC,5 digit postal code
      </p>
      <hr />
      <form onSubmit={handleSubmit}>
        <CardElement />
        <Button onClick={handleBack}>Back</Button>
        <Button
          type="submit"
          variant="contained"
          className="!bg-[#04ac4d] text-white hover:opacity-70 w-vw-70 laptop:justify-self-end rounded-full text-sm whitespace-nowrap px-10 justify-self-center"
        >
          Subscribe
        </Button>
        <div>{messages}</div>
      </form>
    </>
  );
}
