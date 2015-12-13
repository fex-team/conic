const React = require('react');
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;

const Home = require('./home');
const ToolBar = require('./edit/toolbar');

module.exports = React.createElement(
    Router,
    null,
    React.createElement(Route, { path: '/',
        component: Home }),
    React.createElement(Route, { path: '/edit', component: ToolBar })
);