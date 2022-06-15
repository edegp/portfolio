import {
  Client,
  GetPageInfoRequest,
  GetPageMediaRequest,
  PostPagePhotoMediaRequest,
  PostPublishMediaRequest,
  PostPublishMediaResponse,
  GetContainerRequest,
  GetContainerResponse,
} from "instagram-graph-api";

import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "node:stream";
import * as contentful from "contentful-management";
import {
  contentfulClient,
  contentfulConnect,
} from "./../../utils/contentful-client";
import axios from "axios";
// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable: Readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

const PostInstagram = async (req, res) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const { fields } = JSON.parse(buf.toString());
    const title = fields.title["ja-JP"];
    const discription = fields.content["ja-JP"].content
      .map((e) => e.content.map((f) => f.value).join(" "))
      .join("\n");
    const imageId = fields.coverImage["ja-JP"].sys.id;
    contentfulConnect.then((environment) =>
      environment.getAsset(imageId).then((asset) => {
        const imageURL = asset.fields.file["ja-JP"].url;
        let postRequest: PostPagePhotoMediaRequest =
          new PostPagePhotoMediaRequest(
            process.env.ACCESS_TOKEN,
            process.env.PAGE_ID,
            "https:" + imageURL,
            title + "\n" + discription
          );
        postRequest.execute().then((response: GetContainerResponse) => {
          let getContainerRequest = new GetContainerRequest(
            process.env.ACCESS_TOKEN,
            response.data.id
          );
          let postPublishMediaRequest = new PostPublishMediaRequest(
            process.env.ACCESS_TOKEN,
            process.env.PAGE_ID,
            response.data.id
          );
          getContainerRequest.execute().then((status: GetContainerResponse) => {
            status.getContainerStatus().split(":")[0] === "Finished"
              ? postPublishMediaRequest
                  ?.execute()
                  .then((publish: PostPublishMediaResponse) => {
                    axios
                      .post(process.env.VERCEL_API, { req })
                      .then((result) => {
                        return res.status(200).send(publish);
                      })
                      .catch((error) => {
                        return res.status(402).send("cant redeploy");
                      });
                  })
              : res.status(400).send(response);
          });
        });
      })
    );
  }
};

export default PostInstagram;
