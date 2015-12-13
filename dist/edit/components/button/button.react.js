/**
 * @file 按钮组件
 * @author dongtiancheng
 * @date 15/10/13.
 * @email dongtiancheng@baidu.com
 */

var React = require('react');

var Button = React.createClass({
    displayName: 'Button',

    render: function () {
        return React.createElement(
            'button',
            this.props,
            this.props.children
        );
    }
});

module.exports = Button;