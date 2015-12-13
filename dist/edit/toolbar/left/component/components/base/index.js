var React = require('react');
var DragSource = require('../drag-source');
var Component = require('../component');
var iconMap = require('../icon-map');

module.exports = React.createClass({
    displayName: 'exports',

    getInitialState: function () {
        return {};
    },

    render: function () {
        return React.createElement(
            'div',
            { className: '_namespace' },
            React.createElement(
                'div',
                { className: 'container' },
                React.createElement(
                    DragSource,
                    { type: 'BaseText' },
                    React.createElement(
                        Component,
                        { icon: iconMap.BaseText },
                        '文字'
                    )
                )
            )
        );
    }
});