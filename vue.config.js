const webpack = require('webpack')

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        BUILDTIME: JSON.stringify(new Date())
      })
    ]
  },

  chainWebpack: config => {
    config.performance
      .maxEntrypointSize(750 * 1024)
      .maxAssetSize(600 * 1024)
  }
}
