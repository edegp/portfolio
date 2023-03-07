import * as instagramGraphApi from "instagram-graph-api"

import { NextApiRequest, NextApiResponse } from "next"
import { Readable } from "node:stream"
import * as contentful from "contentful-management"
import {
  contentfulClient,
  contentfulConnect,
} from "./../../utils/contentful-client"
import axios from "axios"
import { AbstractResponse } from "instagram-graph-api"
// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
}

async function buffer(readable: Readable) {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

const PostInstagram = async (req, res) => {
  if (req.method === "POST") {
    const buf = await buffer(req)
    const { fields } = JSON.parse(buf.toString())
    const title = fields.title["ja-JP"]
    const discription = fields.content["ja-JP"].content
      .map((e) => e.content.map((f) => f.value).join(" "))
      .join("\n")
    const imageId = fields.coverImage["ja-JP"].sys.id
    contentfulConnect.then((environment) =>
      environment.getAsset(imageId).then((asset) => {
        const imageURL = asset.fields.file["ja-JP"].url
        let postRequest: instagramGraphApi.PostPagePhotoMediaRequest =
          new instagramGraphApi.PostPagePhotoMediaRequest(
            process.env.ACCESS_TOKEN,
            process.env.PAGE_ID,
            "https:" + imageURL,
            title + "\n" + discription
          )
        postRequest
          .execute()
          .then((response: AbstractResponse<{ id: string }>) => {
            let getContainerRequest = new instagramGraphApi.GetContainerRequest(
              process.env.ACCESS_TOKEN,
              response.getData().id
            )
            let postPublishMediaRequest =
              new instagramGraphApi.PostPublishMediaRequest(
                process.env.ACCESS_TOKEN,
                process.env.PAGE_ID,
                response.getData().id
              )
            getContainerRequest
              .execute()
              .then((status: instagramGraphApi.GetContainerResponse) => {
                status.getContainerStatus().split(":")[0] === "Finished"
                  ? postPublishMediaRequest?.execute().then((publish) => {
                      axios
                        .post(process.env.VERCEL_API, { req })
                        .then((result) => {
                          return res.status(200).send(publish)
                        })
                        .catch((error) => {
                          return res.status(402).send("cant redeploy")
                        })
                    })
                  : res.status(400).send(response)
              })
          })
      })
    )
  }
}

export default PostInstagram
