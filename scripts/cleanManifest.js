var path = require('path')

var fsExtra = require('fs-extra');
var glob = require('glob-all');
var manifestDir = require('../constants').Dir.manifestBase;

glob.sync(path.join(manifestDir,'**/*'))
    .forEach(function(file){
        fsExtra.removeSync(file)
    });

