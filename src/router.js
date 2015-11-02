var React = require('react')
var reactRouter = require('react-router')
var Router = reactRouter.Router
var Route = reactRouter.Route
var IndexRoute = reactRouter.IndexRoute

var Home = require('./home')
var ToolBar = require('./edit/toolbar')
var Phone = require('./edit/phone-edit')

module.exports = (
    <Router>
        <Route path="/"
               component={Home}/>
        <Route path="/edit"
               component={ToolBar}>
            <IndexRoute component={Phone}/>
        </Route>
    </Router>
)