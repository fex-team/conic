var React = require('react')
var ItemTypes = require('../toolbar/top/component/drag-type')
var ReactDnD = require('react-dnd')
require('./index.scss')

var boxTarget = {
    drop: function() {
        return { name: 'Dustbin' }
    }
}

var Dustbin = React.createClass({
    propTypes: {
        connectDropTarget: React.PropTypes.func.isRequired,
        isOver: React.PropTypes.bool.isRequired,
        canDrop: React.PropTypes.bool.isRequired
    },
    render: function() {
        var isActive = this.props.canDrop && this.props.isOver

        if (isActive) {

        } else if (this.props.canDrop) {

        }

        return this.props.connectDropTarget(
            <div>
                {isActive ? 'Release to drop' : 'Drag a box here'}
            </div>
        )
    }
})

module.exports = ReactDnD.DropTarget(ItemTypes.layout, boxTarget, function(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    };
})(Dustbin)