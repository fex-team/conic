var React = require('react')
var EditAction = require('../actions/edit-action')

module.exports = React.createClass({
    getInitialState: function () {
        return {}
    },

    onClick: function () {
        EditAction.selectComponent('obj')
    },

    render: function () {
        return (
            <div>
                <div onClick={this.onClick}>
                    {this.props.children}
                </div>
            </div>
        )
    }
})