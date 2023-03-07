import { withApiAuth, getUser } from "@supabase/supabase-auth-helpers/nextjs"
import { createOrRetrieveCustomer } from "../../utils/supabase-admin"
import { stripe } from "../../utils/stripe"
import { upsertInfo } from "../../utils/supabase-admin"
import { NextApiRequest, NextApiResponse } from "next/types"

const updateCustomer = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { user } = await getUser({ req, res })
    const { default_payment_method, customerId, info } = req.body
    let userInfo
    if (info) {
      userInfo = await Object.keys(info)
        .filter((key) => key !== "password")
        .reduce(
          (result, ObjectKey) => (
            (result[ObjectKey] = info[ObjectKey]), result
          ),
          {}
        )
      userInfo.id = user.id
      if (!userInfo.email) userInfo.email = user.email || ""
      userInfo.payment_method =
        default_payment_method || info.payment_method || ""
    }

    try {
      if (req.body.info) await upsertInfo(userInfo)
      if (default_payment_method) {
        const update = await stripe.customers.update(customerId, {
          invoice_settings: { default_payment_method },
        })
        return res.status(200).json({ update })
      } else {
        return res.status(200).json("success")
      }
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}

export default withApiAuth(updateCustomer)
