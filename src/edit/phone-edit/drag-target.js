var React = require('react')
var ItemTypes = require('../toolbar/left/component/components/drag-type')
var ReactDnD = require('react-dnd')
var classNames = require('classnames')
var auxiliartStore = require('../stores/auxiliary-store')

var boxTarget = {
    drop: function (props, monitor, component) {
        if (!props.enabledTarget) {
            return
        }

        const hasDroppedOnChild = monitor.didDrop()
        if (hasDroppedOnChild) {
            return
        }

        // 获得拖拽的组件
        const item = monitor.getItem()
        props.onDrop(item)
    }
}

var Dustbin = React.createClass({
    getInitialState: function () {
        return {
            show: false
        }
    },

    onChange: function () {
        const auxiliartInfo = auxiliartStore.get()
        this.setState({
            show: auxiliartInfo.showLayoutBox
        })
    },

    componentDidMount: function () {
        auxiliartStore.addChangeListener(this.onChange)
        this.onChange()
    },

    componentWillUnmount: function () {
        auxiliartStore.removeChangeListener(this.onChange)
    },

    componentWillReceiveProps: function (nextProps) {
        if (nextProps.isOver) {
            nextProps.dragHover()
        }
    },

    render: function () {
        let isActive = this.props.canDrop && this.props.isOver

        var className = classNames([
            'drag-target',
            {'active': isActive && this.props.enabledTarget},
            {'can-drop': !isActive && ((this.props.canDrop && this.props.enabledTarget) || this.state.show)},
            {'absolute': this.props.absolute}
        ])

        return this.props.connectDropTarget(
            <div style={{height:'100%'}}>
                <div style={{height:'100%'}}
                     className={className}>
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