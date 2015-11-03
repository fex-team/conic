var React = require('react')
var ReactDnD = require('react-dnd')
var ItemTypes = require('../toolbar/left/component/components/drag-type')
var dragDropManager = require('../drag-drop-manager')

const boxTarget = {
    drop(props, monitor, component) {
        const item = monitor.getItem()
        const delta = monitor.getDifferenceFromInitialOffset()

        return {
            delta: delta
        }
    }
}

var DragAround = React.createClass({
    getInitialState: function () {
        return {}
    },

    render: function () {
        return this.props.connectDropTarget(
            <div>
                {this.props.children}
            </div>
        )
    }
})

module.exports = ReactDnD.DropTarget(ItemTypes.layoutAbsolute, boxTarget, function (connect) {
    return {
        connectDropTarget: connect.dropTarget()
    }
})(DragAround)