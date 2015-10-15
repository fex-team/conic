// antd样式
require('antd/lib/index.css')

// 全局样式
require('./reset.scss')

// 全局路由
var React = require('react')
var reactRouter = require('react-router')
var Router = reactRouter.Router
var routes = require('./router')

React.render(routes, document.body)