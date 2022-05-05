import { stripe } from "../../utils/stripe";
import {
  getUser,
  withAuthRequired,
} from "@supabase/supabase-auth-helpers/nextjs";
import {
  createOrRetrieveCustomer,
  upsertInfo,
} from "../../utils/supabase-admin";
import { getURL } from "../../utils/helpers";
import { NextApiRequest, NextApiResponse } from "next";

const createSubscription = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    const { user } = await getUser({ req, res });
    const { price, info, quantity = 1, metadata = {} } = req.body;
    try {
      const customer = await createOrRetrieveCustomer({
        uuid: user.id || "",
        email: user.email || "",
      });
      const subscription = await stripe.subscriptions.create({
        customer,
        items: [
          {
            price: price.id,
            quantity,
          },
        ],
        payment_behavior: "default_incomplete",
        expand: ["latest_invoice.payment_intent"],
      });
      return res.status(200).json({
        customer,
        subscriptionId: subscription.id,
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      });
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
};

export default withAuthRequired(createSubscription);
