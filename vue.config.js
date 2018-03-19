// Save build time to a git-ignored file.
// Will be used to diplay build time in application footer
const fs = require('fs')
const json = JSON.stringify({ timestamp: new Date() })
fs.writeFile('src/build-time.json', json, () => {})

// Add path for postcss-loader
// Otherwise Docker build will fail
const merge = require('webpack-merge')
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('css')
      .use('postcss-loader')
      .tap(options =>
        merge(options, {
          config: {
            path: '.postcssrc'
          }
        })
      )
  }
}
