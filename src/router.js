const React = require('react')
const ReactRouter = require('react-router')
const Router = ReactRouter.Router
const Route = ReactRouter.Route
const IndexRoute = ReactRouter.IndexRoute

const Home = require('./home')
const ToolBar = require('./edit/toolbar')

module.exports = (
    <Router>
        <Route path="/"
               component={Home}/>
        <Route path="/edit" component={ToolBar}/>
    </Router>
)