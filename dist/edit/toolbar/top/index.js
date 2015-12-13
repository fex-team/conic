const React = require('react');
require('./index.scss');

var MenuComponent = require('./menu');
const ModalComponent = require('./modal');

module.exports = React.createClass({
    displayName: 'exports',

    render: function () {
        return React.createElement(
            'div',
            { className: '_namespace' },
            React.createElement(ModalComponent, null),
            React.createElement(MenuComponent, null)
        );
    }
});