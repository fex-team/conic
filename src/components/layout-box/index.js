var React = require('react')
var $ = require('jquery')
var components = require('../../components')
var _ = require('lodash')
require('./index.scss')

let LayoutBox = React.createClass({
    getDefaultProps: function () {
        return {
            name: 'layout-box',
            desc: '万能矩形',
            childs: [{
                name: 'LayoutBox',
                props: {
                    childs: [{
                        name: 'LayoutBox',
                        props: {}
                    }]
                }
            }],
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
                        margin: 0,
                        padding: 0,
                        width: 500,
                        height: 50,
                        fontSize: 14,
                        color: '#333',
                        background: 'white'
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
        return {
            childs: _.cloneDeep(this.props.childs)
        }
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

module.exports = LayoutBox