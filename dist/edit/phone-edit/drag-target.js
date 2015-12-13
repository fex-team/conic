const React = require('react');
const ItemTypes = require('../toolbar/left/component/components/drag-type');
const ReactDnD = require('react-dnd');
const classNames = require('classnames');
const auxiliartStore = require('../stores/auxiliary-store');
const editStore = require('../stores/edit-store');
const isParentEdit = require('./lib/is-parent-edit');

const boxTarget = {
    drop: function (props, monitor, component) {
        const hasDroppedOnChild = monitor.didDrop();
        if (hasDroppedOnChild) {
            return;
        }

        // 获得拖拽的组件
        const item = monitor.getItem();
        props.onDrop(item);
    }
};

const Dustbin = React.createClass({
    displayName: 'Dustbin',

    getInitialState: function () {
        return {
            show: false,
            canActive: true
        };
    },

    onChange: function () {
        const auxiliartInfo = auxiliartStore.get();
        this.setState({
            show: auxiliartInfo.showLayoutBox
        });
    },

    componentDidMount: function () {
        auxiliartStore.addChangeListener(this.onChange);
        this.onChange();
    },

    componentWillUnmount: function () {
        auxiliartStore.removeChangeListener(this.onChange);
    },

    componentWillReceiveProps: function (nextProps) {
        if (nextProps.isOver) {
            nextProps.dragHover();
        }

        // 如果正在拖拽的组件是当前组件的父级（无限向上递归），或者是子一级，或者是自身，则不可拖拽
        let dragComponent = editStore.getDragComponent();

        if (dragComponent && dragComponent === nextProps.edit) {
            return this.setState({
                canActive: false
            });
        }

        if (dragComponent && dragComponent.props.parent === nextProps.edit) {
            return this.setState({
                canActive: false
            });
        }

        if (dragComponent && isParentEdit(nextProps.edit, dragComponent)) {
            return this.setState({
                canActive: false
            });
        }

        return this.setState({
            canActive: true
        });
    },

    render: function () {
        let isActive = this.props.canDrop && this.props.isOver;

        let className = classNames(['drag-target', { 'active': isActive && this.state.canActive }, { 'can-drop': this.props.canDrop || this.state.show }, { 'absolute': this.props.absolute }]);

        return this.props.connectDropTarget(React.createElement(
            'div',
            { style: { height: '100%' } },
            React.createElement(
                'div',
                { style: { height: '100%' },
                    className: className },
                this.props.children
            )
        ));
    }
});

module.exports = ReactDnD.DropTarget(ItemTypes.layout, boxTarget, function (connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop()
    };
})(Dustbin);