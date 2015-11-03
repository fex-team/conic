var React = require('react')
var OperateButton = require('./operate-button')
var Menu = require('./menu')
require('./index.scss')

module.exports = React.createClass({
    render: function () {
        return (
            <div>
                <Menu/>
            </div>
        )
    }
})