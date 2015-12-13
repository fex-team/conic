const React = require('react');
const Tabs = require('antd/lib/tabs');
const TabPane = Tabs.TabPane;
const Tooltip = require('antd/lib/tooltip');
const editStore = require('../../stores/edit-store');
const Badge = require('antd/lib/badge');
const classNames = require('classnames');

const Tree = require('./tree');

require('./index.scss');

const Right = React.createClass({
    displayName: 'Right',

    getInitialState: function () {
        return {
            activeTab: 'tree',
            show: true
        };
    },

    componentDidMount: function () {},

    componentWillUnmount: function () {},

    render: function () {

        let closeClass = classNames({
            'close-container': true,
            'show-animate': this.state.show,
            'hide-animate': !this.state.show
        });

        return React.createElement(
            'div',
            { className: '_namespace', style: { height: '100%' } },
            React.createElement(
                Tabs,
                { activeKey: this.state.activeTab },
                React.createElement(
                    TabPane,
                    { tab: React.createElement(
                            Tooltip,
                            { placement: 'bottom', title: '项目树状结构' },
                            React.createElement('i', { className: 'fa fa-tree' })
                        ),
                        key: 'tree' },
                    React.createElement(Tree, null)
                )
            ),
            React.createElement(
                'div',
                { className: closeClass,
                    onClick: this.handleClose },
                '收起'
            )
        );
    }
});

module.exports = Right;