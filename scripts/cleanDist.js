var path = require('path')

var fsExtra = require('fs-extra');
var glob = require('glob-all');
var distBaseDir = require('../constants').Dir.distBase;

glob.sync(path.join(distBaseDir,'**/*'))
    .forEach(function(file){
        fsExtra.removeSync(file)
    });
