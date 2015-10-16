var React = require('react')
var ReactDnd = require('react-dnd')
var dragItem = require('./drag-type')
require('./index.scss')

const source = {
    canDrag: function () {
        return true
    },

    beginDrag: function (props) {
        console.log(props)
        return {id: props.id}
    },

    isDragging: function (props, monitor) {
        return monitor.getItem().id === props.id;
    },

    endDrag: function (props) {
        console.log(props)
    }
}

var Drag = React.createClass({
    propTypes: {
        connectDragSource: React.PropTypes.func.isRequired,
        isDragging: React.PropTypes.bool.isRequired,
    },

    getInitialState: function () {
        return {}
    },

    render: function () {
        return (
            this.props.connectDragSource(
                <div>
                    <div className="component-item">
                        <i className={'fa fa-'+this.props.icon}></i>
                        <span>{this.props.children}</span>
                    </div>
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
})(Drag)
