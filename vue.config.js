const merge = require('webpack-merge')

// Save current time to a git-ignored file.
// Will be used to diplay build time in application footer
const fs = require('fs')
const json = JSON.stringify({ date: new Date() })
fs.writeFile('src/timestamp.json', json, () => {})

module.exports = {
  chainWebpack: config => {
    config.module
      .rule('css')
      .use('postcss-loader')
      .tap(options =>
        merge(options, {
          // Important fix to allow Docker builds
          config: {
            path: '.postcssrc'
          }
        })
      )
  }
}
