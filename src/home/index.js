var React = require('react')
var reactRouter = require('react-router')
var Link = reactRouter.Link
require('./index.scss')

var Home = React.createClass({
    render: function () {
        return (
            <div>
                <Link className="btn" to="/edit">编辑网站</Link>
            </div>
        )
    }
})

module.exports = Home