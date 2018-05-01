const config = require('./webpack.config.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

config.plugins = [
  new webpack.DefinePlugin({
    '__DEV__': false
  }),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    compress: {
      sequences: true,
      dead_code: true,
      conditionals: true,
      booleans: true,
      unused: true,
      if_return: true,
      join_vars: true,
      drop_console: true
    },
    output: {
      comments: false
    }
  }),
  new HtmlWebpackPlugin({
    template: 'assets/index.ejs'
    // baseUrl: 'http://scfp.supplychainasia.org/'
  })
]

module.exports = config
