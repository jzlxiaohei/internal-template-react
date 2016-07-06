var path = require('path');
var webpack = require('webpack');
var glob = require('glob');
var _ = require('lodash');
var bourbon = require('node-bourbon').includePaths;

function getEntries() {
  var entryBasePath = path.join(__dirname, 'src')
  var entryFiles = glob.sync(path.join(entryBasePath, '**/entry.js'))
  var entryObj = {};
  var argv = require('yargs').argv;

  var filterReg = argv.f ? new RegExp(argv.f) : undefined;
  var ignoreReg = argv.i ? new RegExp(argv.i) : undefined;

  entryFiles.forEach(function (filePath) {
    if (filterReg && !filterReg.test(filePath)) return;
    if (ignoreReg && ignoreReg.test(filePath)) return;

    var key = path.relative(entryBasePath, filePath);
    key = key.substring(0, key.lastIndexOf('.'));
    var entryArr = [filePath];
    if (process.env.NODE_ENV !== 'production') {
      entryArr.unshift('webpack-hot-middleware/client?reload=false');
    }
    entryObj[key] = entryArr;
  });

  return entryObj;
}

var commonConfig = {
  cache: true,
  devtool: '#cheap-source-map',
  entry: getEntries(),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: ''
  },
  plugins: [
    new webpack.DefinePlugin({
      '__DEV__': true,
      '__STAGING__': false
    }),
    // Webpack 1.0
    new webpack.optimize.OccurenceOrderPlugin(),
    // Webpack 2.0 fixed this mispelling
    // new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('./manifest/vendor-manifest.json'),
      sourceType: 'var'
    })
  ],
  resolve:{
    alias: {
      config: __dirname + '/src/app/config/' + (process.env.FE_ENV || "development")+'.js',
      app: __dirname + '/src/app'

    }
  },
  module: {
    preLoaders: [
      { test: /\.js|\.jsx$/, loader: "eslint-loader", exclude: /node_modules/ }
    ],
    loaders: [
      {
        test: /\.js|\.jsx$/,
        loaders: ['babel?cacheDirectory=true'],
        exclude: /node_modules/
      },
      { test: /\.scss/, loader: 'style-loader!css-loader!sass-loader?includePaths[]=' + bourbon },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=10000', __key: 'url-loader' },
      { test: /\.tpl/, loader: 'raw-loader' }
    ]
  }
};


module.exports = commonConfig;
