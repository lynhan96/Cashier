const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const config = {
  context: path.join(__dirname, '/app'),
  entry: ['babel-polyfill', './index.js'],
  devServer: {
    historyApiFallback: true,
    contentBase: './public',
    port: 5000
  },

  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/public')
  },

  resolve: {
    modules: ['node_modules', 'app']
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.less/,
        loader: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      '__DEV__': true
    }),
    new HtmlWebpackPlugin({
      template: 'assets/index.ejs',
      baseUrl: 'http://localhost:5000/'
    })
  ]
}
module.exports = config
