const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.js');

var fs = require("fs");

var compiler = webpack(config
);
var server = new WebpackDevServer(compiler, {
    contentBase: './'
});
server.listen(8080, "localhost", function() {});
