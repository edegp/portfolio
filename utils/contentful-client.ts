import * as contentful from "contentful-management"

export const contentfulClient = contentful.createClient({
  // This is the access token for this space. Normally you get the token in the Contentful web app
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

export const contentfulConnect = contentfulClient
  .getSpace(process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID)
  .then((space) => space.getEnvironment("master"))

export const createAssets = (environment, title, description, url) =>
  environment
    .createAsset({
      fields: {
        title: {
          "ja-JP": title,
        },
        description: {
          "ja-JP": description,
        },
        file: {
          "ja-JP": {
            contentType: "image/jpeg",
            fileName: title + ".jpeg",
            upload: url,
          },
        },
      },
    })
    .then((asset) => asset.processForAllLocales())
    .then((asset) => {
      asset.publish()
      return asset
    })
export const getTags = (environment, caption) =>
  environment.getTags().then((tags) => {
    let newTags
    if (tags.items.length !== 0) {
      newTags = caption
        .substr(caption.indexOf("#", 0) + 1)
        .split("#")
        .filter((i) => tags?.indexOf(i) === -1)
        .map((tag) => {
          const sys = {
            sys: {
              type: "Link",
              linkType: "Tag",
              id: tag,
            },
          }
          return sys
        })
    }
    return newTags | tags.items
  })
export const getAuthor = (environment) =>
  environment.getEntry("6754QhfY8WKPNa5Y479a0r")
