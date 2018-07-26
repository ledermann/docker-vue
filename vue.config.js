const webpack = require('webpack')

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        BUILDTIME: JSON.stringify(new Date())
      })
    ]
  },
}
