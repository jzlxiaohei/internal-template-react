var path = require('path')
var express = require('express');
var webpack = require('webpack');

var config = require('./webpack.common.config.js');

var app = express();
var compiler = webpack(config);
// 'webpack/hot/dev-server'
app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static('dist'));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname,'src/index.html'))
});

require('./mocked_server')(app);


var devPort = 9527;
app.listen(devPort, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Listening at http://localhost:' + devPort);
});

