import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import LoadingDots from "../../components/ui/LoadingDots";
import { useRouter } from "next/router";
import { getStripe } from "../../utils/stripe-client";
import { useUser } from "../../utils/useUser";
import { stripe } from "../../utils/stripe";
import { getUser, withPageAuth } from "@supabase/supabase-auth-helpers/nextjs";
import { createOrRetrieveCustomer } from "../../utils/supabase-admin";
import { getURL } from "../../utils/helpers";
import { NextApiRequest, NextApiResponse } from "next";
import { CardElementForm } from "../../components/subscription";
import Box from "@mui/material/Box";

export const getServerSideProps = withPageAuth({
  getServerSideProps: async ({ req, res }) => {
    const { user } = await getUser({ req, res });
    const customer = await createOrRetrieveCustomer({
      uuid: user.id || "",
      email: user.email || "",
    });
    const intent = await stripe.setupIntents.create({
      customer: customer,
      payment_method_types: ["card"],
    });
    return {
      props: {
        intent,
      },
    };
  },
  redirectTo: "/subscription/signin",
});

export default function addPayment({ user, intent }) {
  const router = useRouter();
  // const [name, setName] = useState("Jenny Rosen");
  // const [messages, _setMessages] = useState("");
  const [Intent, setIntent] = useState();
  const [isLoadingIntent, setIsLoadingIntent] = useState<boolean | false>(
    false
  );
  const { isLoading, subscription } = useUser();
  // const setMessage = (message) => {
  //   _setMessages(`${messages}\n\n${message}`);
  // };
  const Stripe = useStripe();
  const elements = useElements();

  if (!Stripe || !elements) {
    return "";
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoadingIntent(true);
    const cardElement = elements.getElement(CardElement);
    const client_secret = intent.client_secret;
    const setupIntent = await Stripe.confirmCardSetup(client_secret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: name,
        },
      },
    });
    setIntent(setupIntent);
    setIsLoadingIntent(false);
  };
  useEffect(() => {
    if (Intent && !isLoading) router.push("/subscription/customer-portal");
  }, [Intent]);
  useEffect(() => {
    if (!subscription && !isLoading) router.push("/subscription");
  }, [subscription]);
  return (
    <Container className="max-w-vw-64">
      <h1 className="text-sm leading-6  my-6">
        クレジットカード
        <br />
        またはデビットカードを選択
      </h1>
      <p className="text-sm">4242424242424242</p>
      {/* <p className="text-sm">4000002500003155</p> */}
      <Box className="">
        <Image src={Credit} height={50} width={420} />
      </Box>
      <hr />
      <form onSubmit={handleSubmit}>
        <CardElementForm />
        <button
          loading={isLoadingIntent}
          type="submit"
          disabled={isLoadingIntent}
        >
          Subscribe
          {isLoadingIntent && (
            <i className="pl-2 m-0 flex">
              <LoadingDots />
            </i>
          )}
        </button>

        <div>{messages}</div>
      </form>
    </Container>
  );
}
