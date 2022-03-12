const path = require('path')

module.exports = {
  // images: {
  //   loader: 'custom',
  // },
  sassOptions: {
    reactStrictMode: true,
    includePaths: [path.join(__dirname, 'styles')],
  },
  'fontawesome-svg-core': {
    'license': 'free'
  }
}