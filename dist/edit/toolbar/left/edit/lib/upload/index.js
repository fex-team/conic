var React = require('react');
var Upload = require('antd/lib/upload');
var Dragger = Upload.Dragger;

module.exports = React.createClass({
    displayName: 'exports',

    render: function () {
        var props = {
            name: 'file',
            action: '/upload.do',
            onChange: function (info) {
                console.log(info);
            }
        };

        return React.createElement(
            'div',
            null,
            React.createElement(
                Dragger,
                props,
                React.createElement(
                    'p',
                    { className: 'ant-upload-drag-icon' },
                    React.createElement('i', { className: 'anticon anticon-inbox' })
                ),
                React.createElement(
                    'p',
                    { className: 'ant-upload-text' },
                    '拖拽至此区域上传'
                ),
                React.createElement(
                    'p',
                    { className: 'ant-upload-hint' },
                    '支持点击上传'
                )
            )
        );
    }
});