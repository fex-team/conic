var React = require('react')
require('./index.scss')

let layoutBox = React.createClass({
    getDefaultProps: function () {
        return {
            name: 'layout-box',
            desc: '万能矩形',
            opts: {
                flex: {
                    edit: 'flex',
                    value: {
                        flexDirection: 'row',
                        flexWrap: 'nowrap',
                        justifyContent: 'flex-start',
                        alignItems: 'stretch'
                    }
                },
                base: {
                    value: {
                        width: 100,
                        height: 50,
                        color: '#333'
                    },
                    edit: 'style'
                },
                url: {
                    value: 'http://tieba.baidu.com',
                    edit: 'text',
                    desc: '上传地址'
                },
                maxLength: {
                    value: 5,
                    edit: 'number',
                    desc: '最大数量'
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
                <div className="container"
                     style={Object.assign(this.props.opts.flex.value,this.props.opts.base.value)}>
                    123
                </div>
            </div>
        )
    }
})

module.exports = layoutBox;