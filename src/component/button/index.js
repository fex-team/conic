/**
 * @file 按钮组件
 * @author huangziyi01
 * @date 15/10/13.
 * @email huangziyi01@baidu.com
 */

var React = require('react');
require('./index.scss');

module.exports = React.createClass({
    render: function () {
        return (
            <div>
                <div className={'btn btn-'+this.props.type}>{this.props.children || '默认按钮'}</div>
            </div>
        )
    }
});