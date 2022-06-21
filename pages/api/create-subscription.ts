import { stripe } from "../../utils/stripe";
import { getUser, withApiAuth } from "@supabase/supabase-auth-helpers/nextjs";
import {
  createOrRetrieveCustomer,
  upsertInfo,
} from "../../utils/supabase-admin";
import { getURL } from "../../utils/helpers";
import { NextApiRequest, NextApiResponse } from "next";

export default withApiAuth(async function createSubscription(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { user } = await getUser({ req, res });
    const { price, subscriptionId, metadata = {} } = req.body;
    try {
      const customer = await createOrRetrieveCustomer({
        uuid: user?.id || "",
        email: user?.email || "",
      });
      if (subscriptionId) {
        const sub = await stripe.subscriptions.retrieve(subscriptionId);
        await stripe.subscriptions
          .create({
            customer,
            items: [
              {
                price: price.id,
              },
            ],
            default_payment_method: sub.default_payment_method,
            payment_behavior: "default_incomplete",
            expand: ["latest_invoice.payment_intent"],
          })
          .then((subscription) =>
            res.status(200).json({
              customer,
              clientSecret:
                subscription.latest_invoice.payment_intent.client_secret,
            })
          )
          .catch((error) => res.status(500).json(err.message));
      } else if (price.unit_amount === 1980 || price.unit_amount === 2980) {
        await stripe.subscriptions
          .create({
            customer,
            items: [
              {
                price: price.id,
              },
            ],
            trial_period_days: 30,
            payment_behavior: "default_incomplete",
            expand: ["pending_setup_intent"],
          })
          .then((subscription) =>
            res.status(200).json({
              customer,
              clientSecret: subscription.pending_setup_intent.client_secret,
            })
          )
          .catch((error) => res.status(500).json(err.message));
      } else {
        await stripe.subscriptions
          .create({
            customer,
            items: [
              {
                price: price.id,
              },
            ],
            payment_behavior: "default_incomplete",
            expand: ["latest_invoice.payment_intent"],
          })
          .then((subscription) =>
            res.status(200).json({
              customer,
              clientSecret:
                subscription.latest_invoice.payment_intent.client_secret,
            })
          )
          .catch((error) => res.status(500).json(err.message));
      }
    } catch (err: any) {
      console.log(err);
      res
        .status(500)
        .json({ error: { statusCode: 500, message: err.message } });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
});
