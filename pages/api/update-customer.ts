import { withApiAuth, getUser } from "@supabase/supabase-auth-helpers/nextjs";
import { createOrRetrieveCustomer } from "../../utils/supabase-admin";
import { stripe } from "../../utils/stripe";
import { upsertInfo } from "../../utils/supabase-admin";

const updateCustomer = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { user } = await getUser({ req, res });
    const { default_payment_method, customerId } = req.body;
    let userInfo;
    if (req.body.info) {
      const { info } = req.body;
      userInfo = await Object.keys(info)
        .filter((key) => key !== "password")
        .reduce(
          (result, ObjectKey) => (
            (result[ObjectKey] = info[ObjectKey]), result
          ),
          {}
        );
      userInfo.id = user.id;
      if (!userInfo.email) userInfo.email = user.email || "";
      userInfo.payment_method = default_payment_method || "";
    }
    try {
      const update = await stripe.customers.update(customerId, {
        invoice_settings: { default_payment_method },
      });
      if (req.body.info) await upsertInfo(userInfo);
      res.status(200).json({ update });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default withApiAuth(updateCustomer);
