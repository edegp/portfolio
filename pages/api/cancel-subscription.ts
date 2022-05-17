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
      const { subscriptionId } = req.body;
      const cancelSubscription = await stripe.subscriptions.update(
        subscriptionId,
        { cancel_at_period_end: true }
      );

      return res.status(200).send({ cancelSubscription });
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
