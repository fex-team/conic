var React = require('react')
var ReactDnd = require('react-dnd')
var dragItem = require('./drag-type')

const source = {
    beginDrag: function (props) {
        return {
            id: props.id,
            left: props.left,
            top: props.top
        }
    }
}

const style = {
    position: 'absolute'
}

const DragSourceAbsolute = React.createClass({
    getInitialState: function () {
        return {}
    },

    render: function () {
        console.log(this.props)
        return (
            this.props.connectDragSource(
                <div style={{ ...style, left:this.props.left, top:this.props.top }}>
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