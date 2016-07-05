var path = require('path');
var AssetsPlugin = require('assets-webpack-plugin');

var assetsPluginInstance = new AssetsPlugin({
  pretty: true,
  path: path.join(__dirname, 'manifest'),
  update: true
})

module.exports = assetsPluginInstance