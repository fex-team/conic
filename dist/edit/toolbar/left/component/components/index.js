var React = require('react');
var Layout = require('./layout');
var Base = require('./base');
var dragDropManager = require('../../../../drag-drop-manager');
require('./index.scss');

const ToolBarTopComponents = React.createClass({
    displayName: 'ToolBarTopComponents',

    getInitialState: function () {
        return {};
    },

    render: function () {
        let component;
        switch (this.props.type) {
            case 'layout':
                component = React.createElement(Layout, null);
                break;
            case 'base':
                component = React.createElement(Base, null);
                break;
        }

        return React.createElement(
            'div',
            { className: '_namespace' },
            component
        );
    }
});

module.exports = dragDropManager.getDefaultManager()(ToolBarTopComponents);