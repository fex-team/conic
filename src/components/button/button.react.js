/**
 * @file 按钮组件
 * @author dongtiancheng
 * @date 15/10/13.
 * @email dongtiancheng@baidu.com
 */

var React = require('react');

var Button = React.createClass({

    render: function () {
        return (
            <button {...this.props}>{this.props.children}</button>
        );
    }
});


module.exports = Button;