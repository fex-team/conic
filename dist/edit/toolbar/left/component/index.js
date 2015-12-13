const React = require('react');
const ComponentTable = require('./component-table');
const Components = require('./components');

const EditPanel = React.createClass({
    displayName: 'EditPanel',

    getInitialState: function () {
        return {
            // 当前菜单类型
            menuType: ''
        };
    },

    onChangeMenuType: function (type) {
        this.setState({
            menuType: type
        });
    },

    render: function () {
        return React.createElement(
            'div',
            { className: '_namespace' },
            React.createElement(ComponentTable, { onChangeType: this.onChangeMenuType }),
            React.createElement(Components, { type: this.state.menuType })
        );
    }
});

module.exports = EditPanel;