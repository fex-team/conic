const React = require('react');
const classNames = require('classnames');
const settingStore = require('../../../../stores/setting-store');
const settingAction = require('../../../../actions/setting-action');
require('./index.scss');

const viewButtonStyle = {
    width: 40,
    textAlign: 'center'
};

module.exports = React.createClass({
    displayName: 'exports',

    getInitialState: function () {
        return {
            type: settingStore.getViewType()
        };
    },

    componentDidMount: function () {
        settingStore.addViewTypeListener(this.hanldeChangeMode);
    },

    componentWillUnmount: function () {
        settingStore.removeViewTypeListener(this.hanldeChangeMode);
    },

    hanldeChangeMode: function () {
        this.setState({
            type: settingStore.getViewType()
        });
    },

    changeType: function (viewType) {
        settingAction.changeViewType(viewType);
    },

    render: function () {
        let pcClass = classNames({
            'operate-btn': true,
            'active': this.state.type === 'pc'
        });

        let mobileClass = classNames({
            'operate-btn': true,
            'active': this.state.type === 'mobile'
        });

        return React.createElement(
            'div',
            { className: '_namespace' },
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { style: viewButtonStyle,
                        className: mobileClass,
                        onClick: this.changeType.bind(this, 'mobile') },
                    React.createElement('i', { className: 'fa fa-tablet' })
                ),
                React.createElement(
                    'div',
                    { style: viewButtonStyle,
                        className: pcClass,
                        onClick: this.changeType.bind(this, 'pc') },
                    React.createElement('i', { className: 'fa fa-laptop' })
                )
            )
        );
    }
});