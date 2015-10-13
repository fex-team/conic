// webpack中间件
var webpackDevServer = require('webpack-dev-server')
var webpack = require('webpack')
var webpackConf = require('./webpack.config.dev.js')

var server = new webpackDevServer(webpack(webpackConf), {
    publicPath: webpackConf.output.publicPath,
    stats: {
        color: true
    }
})

server.listen(8090, 'localhost', function () {
})