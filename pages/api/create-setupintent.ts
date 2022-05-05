import { stripe } from "../../utils/stripe";
import {
  getUser,
  withAuthRequired,
} from "@supabase/supabase-auth-helpers/nextjs";
import { createOrRetrieveCustomer } from "../../utils/supabase-admin";
import { getURL } from "../../utils/helpers";
import { NextApiRequest, NextApiResponse } from "next";

export const createSetupIntent = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    try {
      const intent = await stripe.setupIntents.create({
        payment_method_types: ["card"],
      });

      return res.status(200).send({ intent });
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

export default withAuthRequired(createSetupIntent);
