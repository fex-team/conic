var React = require('react')
var ReactDnd = require('react-dnd')
var dragItem = require('./drag-type')

const source = {
    beginDrag: function (props) {
        return {}
    },
    endDrag: function (props, monitor, component) {
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
                <div>
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