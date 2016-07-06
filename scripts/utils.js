var _ = require('lodash');
var assetsMap = require('../manifest/webpack-assets.json');

var flatAssetsMap = {}
_.forOwn(assetsMap, function (value, key) {
  _.forOwn(value, function (innerValue, innerKey) {
    flatAssetsMap[key + '.' + innerKey] = innerValue;
  })
});

module.exports = {
  assetsMap: flatAssetsMap
};
