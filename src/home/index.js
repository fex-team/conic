const React = require('react')
const ReactRouter = require('react-router')
const Link = ReactRouter.Link
require('./index.scss')

var Home = React.createClass({
    render: function () {
        return (
            <div className="_namespace">
                <Link className="btn" to="/edit">编辑网站</Link>
            </div>
        )
    }
})

module.exports = Home