// antd样式
require('antd/lib/index.css')

// font-awesome
require('font-awesome/css/font-awesome.css')

// 全局样式
require('./reset.scss')

// 全局路由
var React = require('react')
var ReactDOM = require('react-dom')
var reactRouter = require('react-router')
var Router = reactRouter.Router
var routes = require('./router')
var $ = require('jquery')

// 执行loading
ReactDOM.render(routes, document.getElementById('react-dom'))