import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import LoadingDots from "../../components/ui/LoadingDots";
import { useRouter } from "next/router";
import { getStripe } from "../../utils/stripe-client";
import { useUser } from "../../utils/useUser";
import { stripe } from "../../utils/stripe";
import {
  getUser,
  withAuthRequired,
} from "@supabase/supabase-auth-helpers/nextjs";
import { createOrRetrieveCustomer } from "../../utils/supabase-admin";
import { getURL } from "../../utils/helpers";
import { NextApiRequest, NextApiResponse } from "next";

export const getServerSideProps = withAuthRequired({
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

export default function addPayment({ intent }) {
  const router = useRouter();
  const [name, setName] = useState("Jenny Rosen");
  const [messages, _setMessages] = useState("");
  const [Intent, setIntent] = useState();
  const [isLoadingIntent, setIsLoadingIntent] = useState<boolean | false>(
    false
  );
  const { user, isLoading, subscription } = useUser();
  const setMessage = (message) => {
    _setMessages(`${messages}\n\n${message}`);
  };
  const Stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
    if (Intent && !isLoading) {
      router.push("/subscription/customer-portal");
    }
  }, [Intent]);
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
    if (!subscription && !isLoading) router.push("/subscription");
  }, [subscription]);
  return (
    <>
      <h1 className="mt-60">Subscribe</h1>

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
        <label>
          Full name
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <CardElement className="text-lg" />
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
    </>
  );
}
