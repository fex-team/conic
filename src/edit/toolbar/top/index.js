var React = require('react')
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