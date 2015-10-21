var React = require('react')
var Upload = require('antd/lib/upload')
var Dragger = Upload.Dragger

module.exports = React.createClass({
    render: function () {
        var props = {
            name: 'file',
            action: '/upload.do',
            onChange: function (info) {
                console.log(info)
            }
        }

        return (
            <div>
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <i className="anticon anticon-inbox"></i>
                    </p>

                    <p className="ant-upload-text">拖拽至此区域上传</p>

                    <p className="ant-upload-hint">支持点击上传</p>
                </Dragger>
            </div>
        )
    }
})