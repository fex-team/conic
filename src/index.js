// antd样式
require('antd/lib/index.css')

// font-awesome
require('font-awesome/css/font-awesome.css')

// code mirror
require('codemirror/lib/codemirror.css')
require('codemirror/theme/material.css')

// 全局样式
require('./reset.scss')

// 全局路由
var React = require('react')
var ReactDOM = require('react-dom')
var reactRouter = require('react-router')
var Router = reactRouter.Router
var routes = require('./router')
var $ = require('jquery')

if (process.env.NODE_ENV === 'development') {
    let Perf = require('react-addons-perf')
    Perf.start()

    // 执行loading
    ReactDOM.render(routes, document.getElementById('react-dom'))

    Perf.stop()
    Perf.printWasted()
}
else {
    // 执行loading
    ReactDOM.render(routes, document.getElementById('react-dom'))
}
