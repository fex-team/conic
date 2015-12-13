// antd样式
require('antd/lib/index.css');

// fontawesome
require('font-awesome/css/font-awesome.css');

// codemirror
require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');

// 全局样式
require('./reset.scss');

// 全局路由
var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var routes = require('./router');

if (process.env.NODE_ENV === 'development') {
    let Perf = require('react-addons-perf');
    Perf.start();

    ReactDOM.render(routes, document.getElementById('react-dom'));

    Perf.stop();
    Perf.printWasted();
} else {
    ReactDOM.render(routes, document.getElementById('react-dom'));
}