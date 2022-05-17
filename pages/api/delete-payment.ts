import { stripe } from "../../utils/stripe";
import { getUser, withApiAuth } from "@supabase/supabase-auth-helpers/nextjs";
import { createOrRetrieveCustomer } from "../../utils/supabase-admin";
import { getURL } from "../../utils/helpers";
import { NextApiRequest, NextApiResponse } from "next";

const deletePayment = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { user } = await getUser({ req, res });
      const detachedPayment = await stripe.paymentMethods.detach(req.body);
      const customer = await createOrRetrieveCustomer({
        uuid: user.id || "",
        email: user.email || "",
      });
      if (!customer) console.log("Could not get customer");
      const { data } = await stripe.customers.listPaymentMethods(customer, {
        type: "card",
      });
      return res.status(200).send({ del: data });
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

export default withApiAuth(deletePayment);
