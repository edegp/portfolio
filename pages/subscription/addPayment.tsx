import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import LoadingDots from "../../components/ui/LoadingDots";
import { useRouter } from "next/router";
import { getStripe } from "../../utils/stripe-client";
import { useUser } from "../../utils/useUser";
import { stripe } from "../../utils/stripe";
import { getUser, withPageAuth } from "@supabase/supabase-auth-helpers/nextjs";
import { createOrRetrieveCustomer } from "../../utils/supabase-admin";
import { getURL } from "../../utils/helpers";
import { NextApiRequest, NextApiResponse } from "next";
import Subscription from "../../components/subscription";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

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
    const cardElement = elements.getElement(CardNumberElement);
    const client_secret = intent.client_secret;
    const setupIntent = await Stripe.confirmCardSetup(client_secret, {
      payment_method: {
        card: cardElement,
      },
    });
    setIntent(setupIntent);
    setIsLoadingIntent(false);
  };
  // useEffect(() => {
  if (Intent && !isLoading) router.push("/subscription/customer-portal");
  // }, [Intent]);
  if (!subscription && !isLoading) router.push("/subscription");
  return (
    <Box className="system laptop:pt-[18vh] pt-[14vh] section">
      <Container className="mt-10 max-w-lg p-3 m-auto w-90">
        <Subscription
          handleSubmit={handleSubmit}
          setIsLoadingIntent={setIsLoadingIntent}
          setIntent={setIntent}
          intent={intent}
        />
      </Container>
    </Box>
  );
}
