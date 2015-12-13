const React = require('react');
const Tabs = require('antd/lib/tabs');
const TabPane = Tabs.TabPane;
const Tooltip = require('antd/lib/tooltip');
const editStore = require('../../stores/edit-store');
const Badge = require('antd/lib/badge');

const Edit = require('./edit');
const Component = require('./component');
const Auxiliary = require('./auxiliary');
const History = require('./history');

const Left = React.createClass({
    displayName: 'Left',

    getInitialState: function () {
        return {
            activeTab: 'edit'
        };
    },

    componentDidMount: function () {
        editStore.addLeftTabChangeListener(this.onLeftTabChange);
    },

    componentWillUnmount: function () {
        editStore.removeLeftTabChangeListener(this.onLeftTabChange);
    },

    onLeftTabChange: function () {
        this.setState({
            activeTab: editStore.getTabName()
        });
    },

    render: function () {
        return React.createElement(
            'div',
            { className: '_namespace',
                style: { height: '100%' } },
            React.createElement(
                Tabs,
                { activeKey: this.state.activeTab },
                React.createElement(
                    TabPane,
                    { tab: React.createElement(
                            Tooltip,
                            { placement: 'bottom', title: '编辑组件' },
                            React.createElement('i', { className: 'fa fa-edit' })
                        ),
                        key: 'edit' },
                    React.createElement(Edit, null)
                ),
                React.createElement(
                    TabPane,
                    { tab: React.createElement(
                            Tooltip,
                            { placement: 'bottom', title: '组件库' },
                            React.createElement('i', { className: 'fa fa-cubes' })
                        ),
                        key: 'component' },
                    React.createElement(Component, null)
                ),
                React.createElement(
                    TabPane,
                    { tab: React.createElement(
                            Tooltip,
                            { placement: 'bottom', title: '历史纪录' },
                            React.createElement(
                                Badge,
                                { count: this.state.historyCount },
                                React.createElement('i', { className: 'fa fa-history' })
                            )
                        ),
                        key: '2' },
                    React.createElement(History, null)
                ),
                React.createElement(
                    TabPane,
                    { tab: React.createElement(
                            Tooltip,
                            { placement: 'bottom', title: '设置' },
                            React.createElement('i', { className: 'fa fa-gear' })
                        ),
                        key: '3' },
                    React.createElement(Auxiliary, null)
                )
            )
        );
    }
});

module.exports = Left;