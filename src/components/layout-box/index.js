var React = require('react')
require('./index.scss')

module.exports = React.createClass({
    getDefaultProps: function () {
        return {
            name: '万能矩形',
            opts: {
                text: {
                    value: 'Default Text',
                    edit: 'text',
                    desc: '标题内容'
                },
                // 关注
                focus: {
                    value: 'http://tieba.baidu.com',
                    edit: 'text',
                    desc: '请求发送地址'
                }
            }
        }
    },

    getInitialState: function () {
        return {state: 'state'}
    },

    render: function () {
        return (
            <div>
                <div className="container">
                    {this.props.opts.text.value}
                </div>
            </div>
        )
    }
})