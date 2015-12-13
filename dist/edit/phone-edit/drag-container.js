var React = require('react');
var dragDropManager = require('../drag-drop-manager');

var DragContainer = React.createClass({
    displayName: 'DragContainer',

    getInitialState: function () {
        return {};
    },

    render: function () {
        return React.createElement(
            'div',
            { style: { height: 'inherit' } },
            this.props.children
        );
    }
});

module.exports = dragDropManager.getDefaultManager()(DragContainer);