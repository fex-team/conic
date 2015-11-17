var React = require('react')
var dragDropManager = require('../drag-drop-manager')

var DragContainer = React.createClass({
    getInitialState: function () {
        return {}
    },

    render: function () {
        return (
            <div style={{height:'inherit'}}>
                {this.props.children}
            </div>
        )
    }
})

module.exports = dragDropManager.getDefaultManager()(DragContainer)