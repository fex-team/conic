const React = require('react');
const classNames = require('classnames');
const viewStore = require('../../stores/view-store');
const viewAction = require('../../actions/view-action');
require('./index.scss');

const LayoutTemplate = require('./layout-template');

module.exports = React.createClass({
    displayName: 'exports',

    getInitialState: function () {
        return {
            show: false
        };
    },

    componentDidMount: function () {
        viewStore.addchangeViewListener(this.openView);
        viewStore.addCloseViewListener(this.closeView);
    },

    componentWillUnmount: function () {
        viewStore.removechangeViewListener(this.openView);
        viewStore.removeCloseViewListener(this.closeView);
    },

    openView: function () {
        this.setState({
            show: true
        });
    },

    closeView: function () {
        this.setState({
            show: false
        });
    },

    handleClose: function () {
        viewAction.closeView();
    },

    render: function () {
        let layoutClass = classNames({
            'layout': true,
            'show-animate': this.state.show,
            'hide-animate': !this.state.show
        });

        let viewChild;
        switch (viewStore.getViewName()) {
            case 'layoutTemplate':
                viewChild = React.createElement(LayoutTemplate, null);
                break;
        }

        let closeClass = classNames({
            'close-container': true,
            'show-animate': this.state.show,
            'hide-animate': !this.state.show
        });

        return React.createElement(
            'div',
            { className: '_namespace',
                style: { height: '100%', position: 'relative' } },
            React.createElement(
                'div',
                { className: layoutClass },
                viewChild
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