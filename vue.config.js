const merge = require('webpack-merge');

module.exports = {
  chainWebpack: config => {
    config.module
      .rule('css')
      .use('postcss-loader')
      .tap(options =>
        merge(options, {
          // Important fix to allow Docker builds
          path: '.postcssrc',
        })
      );
  }
};
