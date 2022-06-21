const path = require("path");

module.exports = {
  images: {
    domains: ["b.st-hatena.com"],
  },
  sassOptions: {
    reactStrictMode: true,
    includePaths: [path.join(__dirname, "styles")],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // experimental: {
  //   esmExternals: false,
  // },
  // images: {
  //   disableStaticImages: true,
  // },
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
    });

    return config;
  },
};
