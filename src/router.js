const React = require('react')
const reactRouter = require('react-router')
const Router = reactRouter.Router
const Route = reactRouter.Route
const IndexRoute = reactRouter.IndexRoute

const Home = require('./home')
const ToolBar = require('./edit/toolbar')

module.exports = (
    <Router>
        <Route path="/"
               component={Home}/>
        <Route path="/edit" component={ToolBar}/>
    </Router>
)