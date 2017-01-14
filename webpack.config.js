var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackDevServer = require('webpack-dev-server');
module.exports = {
  entry:  __dirname + "/dist/bundle.js",//已多次提及的唯一入口文件
  output: {
    path: __dirname + "/public",//打包后的文件存放的地方
    filename: "bundle.js"//打包后输出文件的文件名
  },
  module: {
    loaders: [
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/test/test.html"//new 一个这个插件的实例，并传入相关的参数
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