var React = require('react');

module.exports = React.createClass({
    displayName: 'exports',

    getInitialState: function () {
        return {};
    },

    render: function () {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'drag-source menu-component' },
                React.createElement('i', { className: 'fa fa-' + this.props.icon }),
                React.createElement(
                    'span',
                    null,
                    this.props.children
                )
            )
        );
    }
});