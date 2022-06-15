import {
  contentfulClient,
  contentfulConnect,
  createAssets,
  getTags,
  getAuthor,
} from "./../../utils/contentful-client";
import {
  Client,
  GetPageInfoRequest,
  GetPageMediaRequest,
} from "instagram-graph-api";

import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "node:stream";
import * as contentful from "contentful-management";

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

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const InstagramWebhookHandler = async (req, res) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const { caption, url, source, time } = JSON.parse(buf.toString());
    const title = caption?.split("\n")[0];
    const titleIndex = caption.indexOf("\n", 0);
    let discription;
    titleIndex !== -1
      ? (discription = caption?.substr(titleIndex + 1))
      : (discription = caption);
    contentfulConnect.then((environment) => {
      Promise.allSettled([
        createAssets(environment),
        getTags(environment),
        getAuthor(environment),
      ]).then((results) => {
        const coverImage = results[0].value;
        const sys = results[1].value;
        const author = results[2].value;
        environment
          .createEntry("post", {
            fields: {
              title: {
                "ja-JP": caption.split("\n")[0],
              },
              coverImage: {
                "ja-JP": {
                  sys: {
                    type: "Link",
                    linkType: "Asset",
                    id: coverImage.sys.id,
                  },
                },
              },
              content: {
                "ja-JP": {
                  nodeType: "document",
                  data: {},
                  content: [
                    {
                      nodeType: "paragraph",
                      data: {},
                      content: [
                        {
                          nodeType: "text",
                          value: caption.substr(caption.indexOf("\n", 0) + 1),
                          data: {},
                          marks: [],
                        },
                      ],
                    },
                  ],
                },
              },
              date: {
                "ja-JP": time,
              },
              author: {
                "ja-JP": {
                  sys: {
                    type: "Link",
                    linkType: "Entry",
                    id: author.sys.id,
                  },
                },
              },
              excerpt: {
                "ja-JP": source,
              },
            },
            metadata: sys && {
              tags: sys && [...sys],
            },
          })
          .then((post) => post.publish());
      });
    });
    return res.status(200).send(req);
  }
};

export default InstagramWebhookHandler;
