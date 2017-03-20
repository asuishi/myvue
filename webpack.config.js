var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackDevServer = require('webpack-dev-server');
module.exports = {
  entry:  __dirname + "/test/test.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },
  module: {
    loaders: [
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/test/test.html"
    })
  ],
  devServer: {
    contentBase: "./public",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
  },
}