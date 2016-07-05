var path = require('path')
var os = require('os')

var urlJoin = require('url-join')
var _ = require('lodash')
var fsExtra = require('fs-extra')

var meta =[
    require('./test_api')
]

var allUrl = [];
module.exports = function (app) {

    _.forEach(meta, function (metaItem) {
        var ns = metaItem.ns || '/'

        _.forEach(metaItem.data, function (dataItem) {
            var urlPath = urlJoin(ns, dataItem.path)
            var method = _.toLower(dataItem.method || 'get')
            app[method](urlPath, function (req, res) {
                if (req.query.__error) {
                    res.status(dataItem.error.code || 400)
                    res.json(dataItem.error.response || dataItem.error)
                } else {
                    res.status(dataItem.success.code || 200)
                    res.json(dataItem.success.response || dataItem.success)
                }
            })
            allUrl.push(method + ' ' + urlPath)
        })
    })

    fsExtra.outputFileSync(path.join(__dirname, '__api_path'), allUrl.join(os.EOL))
}