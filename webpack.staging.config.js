var _ = require('lodash')
var webpack = require('webpack')
var path = require('path')

var commonConfigOrigin = require('./webpack.common.config')

var commonConfig = _.cloneDeep(commonConfigOrigin);

delete commonConfig['devtool']
commonConfig.output.filename = '[name].[chunkhash].js'
// commonConfig.output.publicPath = 'http://cdn.llsapp.com/hybrid/summer-act/'

commonConfig.plugins = [
  require('./assetsPlugin'),

  // Webpack 1.0
  new webpack.optimize.OccurenceOrderPlugin(),
  // Webpack 2.0 fixed this mispelling
  // new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.AggressiveMergingPlugin(),
 
  new webpack.DllReferencePlugin({
    context: '.',
    manifest: require('./manifest/vendor-manifest.json'),
    sourceType: 'var'
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
    '__STAGING__': true,
    '__DEV__': false
  }),
  new webpack.optimize.UglifyJsPlugin({
    mangle: {
      except: ['$', 'exports', 'require']
    },
    // mangle:false,
    // exclude:/\.min\.js$/
    compress: { warnings: false },
    output: { comments: false }
  })
]

module.exports = commonConfig
