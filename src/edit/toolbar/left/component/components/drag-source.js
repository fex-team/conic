var React = require('react')
var ReactDnd = require('react-dnd')
var dragItem = require('./drag-type')
var editAction = require('../../../../actions/edit-action')

const source = {
    canDrag: function () {
        return true
    },

    beginDrag: function (props) {
        if (typeof props.onChangeEnableTarget === 'function') {
            props.onChangeEnableTarget(false)
        } else {
            // 触发dispatcher，但当前组件是编辑组件中拖拽的
            editAction.startDropComponent(null)
        }

        return {
            type: props.type,
            existComponent: props.existComponent || false,
            edit: props.edit
        }
    },

    isDragging: function (props, monitor) {
        return monitor.getItem().id === props.id;
    },

    endDrag: function (props, monitor) {
        if (typeof props.onChangeEnableTarget === 'function') {
            props.onChangeEnableTarget(true)
        }
    }
}

var DragSource = React.createClass({
    getInitialState: function () {
        return {}
    },

    render: function () {
        return (
            this.props.connectDragSource(
                <div style={{height:'100%'}}>
                    {this.props.children}
                </div>
            )
        )
    }
})

module.exports = ReactDnd.DragSource(dragItem.layout, source, function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
})(DragSource)
