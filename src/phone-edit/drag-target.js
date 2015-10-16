var React = require('react')
var ItemTypes = require('../toolbar/top/component/drag-type')
var ReactDnD = require('react-dnd')
require('./index.scss')

var boxTarget = {
    drop: function (props, monitor, component) {
        const hasDroppedOnChild = monitor.didDrop()
        if (hasDroppedOnChild) {
            return
        }

        // 获得拖拽的组件
        const item = monitor.getItem()
        console.log(monitor)
    }
}

var Dustbin = React.createClass({
    propTypes: {
        connectDropTarget: React.PropTypes.func.isRequired,
        isOver: React.PropTypes.bool.isRequired,
        canDrop: React.PropTypes.bool.isRequired
    },
    render: function () {
        let isActive = this.props.canDrop && this.props.isOver
        let dragTargetClassName = 'drag-target'
        if (isActive) {
            dragTargetClassName = dragTargetClassName + ' active'
        } else if (this.props.canDrop) {
            dragTargetClassName = dragTargetClassName + ' can-drop'
        }

        return this.props.connectDropTarget(
            <div>
                <div className={dragTargetClassName}>
                    {this.props.children}
                </div>
            </div>
        )
    }
})

module.exports = ReactDnD.DropTarget(ItemTypes.layout, boxTarget, function (connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver({shallow: true}),
        canDrop: monitor.canDrop()
    }
})(Dustbin)