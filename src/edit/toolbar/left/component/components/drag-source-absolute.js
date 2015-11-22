const React = require('react')
const ReactDnd = require('react-dnd')
const dragItem = require('./drag-type')
var editAction = require('../../../../actions/edit-action')

const source = {
    beginDrag: function (props) {
        if (typeof props.onAbsoluteDragStart === 'function') {
            props.onAbsoluteDragStart()
        } else {
            // 触发dispatcher，但当前组件是编辑组件中拖拽的
            editAction.startDragAbsoluteComponent(null)
        }

        return {}
    },
    endDrag: function (props, monitor, component) {
        if (typeof props.onAbsoluteDragStart === 'function') {
            props.endDragAbsoluteComponent()
        } else {
            // 触发dispatcher，但当前组件是编辑组件中拖拽的
            editAction.endDragAbsoluteComponent(null)
        }

        let delta = monitor.getDropResult() && monitor.getDropResult().delta
        if (delta) {
            // 修改了位置
            props.onChange({
                position: {
                    value: {
                        left: props.left + delta.x,
                        top: props.top + delta.y
                    }
                }
            })
        }
    }
}

const DragSourceAbsolute = React.createClass({
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

module.exports = ReactDnd.DragSource(dragItem.layoutAbsolute, source, function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
})(DragSourceAbsolute)