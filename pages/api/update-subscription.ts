import { stripe } from "../../utils/stripe"
import { withApiAuth } from "@supabase/supabase-auth-helpers/nextjs"
import { NextApiRequest, NextApiResponse } from "next"

const updateSubscription = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    try {
      const { subscriptionId, price } = req.body
      const subscription = await stripe.subscriptions.retrieve(subscriptionId)
      const { customer, default_payment_method } =
        await stripe.subscriptions.update(subscriptionId, {
          items: [
            {
              id: subscription.items.data[0].id,
              price: price.id,
            },
          ],
        })
      return res.status(200).send({
        customer,
        default_payment_method,
      })
    } catch (err: any) {
      console.log(err)
      res.status(500).json({ error: { statusCode: 500, message: err.message } })
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}

export default withApiAuth(updateSubscription)
