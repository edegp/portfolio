import { stripe } from "../../utils/stripe";
import { getUser, withApiAuth } from "@supabase/supabase-auth-helpers/nextjs";
import { createOrRetrieveCustomer } from "../../utils/supabase-admin";
import { getURL } from "../../utils/helpers";
import { NextApiRequest, NextApiResponse } from "next";

const updateSubscription = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    try {
      const { subscriptionId, price } = req.body;
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      if (subscription)
        const updateSubscription = await stripe.subscriptions.update(
          subscriptionId,
          {
            items: [
              {
                id: subscription.items.data[0].id,
                price,
              },
            ],
          }
        );
      return res.status(200).send({ updateSubscription });
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

export default withApiAuth(updateSubscription);
