var React = require('react')
var reactRouter = require('react-router')
var Router = reactRouter.Router
var Route = reactRouter.Route
var IndexRoute = reactRouter.IndexRoute

var ToolBar = require('./toolbar')
var Phone = require('./phone-edit')

module.exports = (
    <Router>
        <Route path="/" component={ToolBar}>
            <IndexRoute component={Phone}/>
        </Route>
    </Router>
)