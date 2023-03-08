// @ts-check
const path = require("path")
/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
  images: {
    domains: ["b.st-hatena.com"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        and: [/\.(js|ts)x?$/],
      },
      use: ["@svgr/webpack"],
    })

    return config
  },
}
