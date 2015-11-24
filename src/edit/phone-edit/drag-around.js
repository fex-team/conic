const React = require('react')
const ReactDnD = require('react-dnd')
const ItemTypes = require('../toolbar/left/component/components/drag-type')
const dragDropManager = require('../drag-drop-manager')

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
            <div style={{height:'inherit'}}>
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