var _ = require('lodash');
var webpack = require('webpack');
var path = require('path');

var commonConfigOrigin = require('./webpack.common.config');

var commonConfig = _.cloneDeep(commonConfigOrigin);

delete commonConfig['devtool'];
commonConfig.output.filename = '[name].[chunkhash].js';


commonConfig.plugins = [
  // Webpack 1.0
  require('./assetsPlugin'),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.AggressiveMergingPlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  // Webpack 2.0 fixed this mispelling
  // new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.DllReferencePlugin({
    context: '.',
    manifest: require('./manifest/vendor-manifest.json'),
    sourceType: 'var'
  }),
  new webpack.DefinePlugin({
    '__DEV__': false,
    '__STAGING__': false,
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  new webpack.optimize.UglifyJsPlugin({
    mangle: {
      except: ['$', 'exports', 'require']
    },
    compress: { warnings: false },
    output: { comments: false }
  })
];

module.exports = commonConfig;
