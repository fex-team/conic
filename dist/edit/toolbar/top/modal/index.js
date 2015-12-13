const React = require('react');
const Modal = require('antd/lib/modal');

module.exports = React.createClass({
    displayName: 'exports',

    getInitialState: function () {
        return {
            visible: false
        };
    },

    handleOk: function () {
        this.setState({
            visible: false
        });
    },

    handleCancel: function () {
        this.setState({
            visible: false
        });
    },

    render: function () {
        return React.createElement(
            Modal,
            { title: '第一个 Modal',
                visible: this.state.visible,
                onOk: this.handleOk,
                onCancel: this.handleCancel },
            React.createElement(
                'p',
                null,
                '对话框的内容'
            ),
            React.createElement(
                'p',
                null,
                '对话框的内容'
            ),
            React.createElement(
                'p',
                null,
                '对话框的内容'
            ),
            React.createElement(
                'p',
                null,
                '对话框的内容'
            ),
            React.createElement(
                'p',
                null,
                '对话框的内容'
            ),
            React.createElement(
                'p',
                null,
                '对话框的内容'
            ),
            React.createElement(
                'p',
                null,
                '对话框的内容'
            ),
            React.createElement(
                'p',
                null,
                '对话框的内容'
            ),
            React.createElement(
                'p',
                null,
                '对话框的内容'
            ),
            React.createElement(
                'p',
                null,
                '对话框的内容'
            ),
            React.createElement(
                'p',
                null,
                '对话框的内容'
            ),
            React.createElement(
                'p',
                null,
                '对话框的内容'
            ),
            React.createElement(
                'p',
                null,
                '对话框的内容'
            ),
            React.createElement(
                'p',
                null,
                '对话框的内容'
            ),
            React.createElement(
                'p',
                null,
                '对话框的内容'
            ),
            React.createElement(
                'p',
                null,
                '对话框的内容'
            ),
            React.createElement(
                'p',
                null,
                '对话框的内容'
            )
        );
    }
});