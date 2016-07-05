var path = require("path");
var webpack = require('webpack');

var assetsPluginInstance = require('./assetsPlugin')

var deps = require('./package.json').dependencies;
delete deps['antd'];// antd 使用官方的 babel-plugin-antd

console.log(Object.keys(deps))

var config = {
  entry: {
    vendor: Object.keys(deps)
  },
  module: {
    loaders: [
      {
        test: /\.js|\.jsx$/,
        loaders: ['babel?cacheDirectory=true'],
        exclude: /node_modules/
      }
    ]
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].dll.js",
    library: "[name]_[hash]_dll", //和下得 DllPlugin的name对应
    libraryTarget: "var"
  },
  plugins: [
    assetsPluginInstance,
    new webpack.DllPlugin({
      path: path.join(__dirname, "manifest", "vendor-manifest.json"),
      name: "[name]_[hash]_dll"
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
};

if (process.env.NODE_ENV == 'production') {
  config.output.filename = '[name].[hash].dll.js';
  config.plugins = config.plugins.concat(
    [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        output: { comments: false }
      })
    ]
  );
}

module.exports = config;
