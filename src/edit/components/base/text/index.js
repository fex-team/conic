const React = require('react')
const pureRenderMixin = require('../../mixins/pureRenderMixin')
const _ = require('lodash')

const defaultStyle = {
    wordBreak: 'break-all'
}

const Text = React.createClass({
    mixins: [pureRenderMixin],

    getDefaultProps: function () {
        return {
            name: 'BaseText',
            desc: '文字',
            opts: {
                base: {
                    value: {
                        text: {
                            value: 'default text',
                            edit: 'text',
                            desc: '文字内容'
                        }
                    },
                    title: '基本',
                    edit: 'custom'
                },
                style: {
                    value: {
                        margin: 0,
                        padding: 0,
                        color: '#333',
                        fontSize: 14
                    },
                    edit: 'style'
                }
            }
        }
    },

    getInitialState: function () {
        return {}
    },

    render: function () {
        return (
            <div style={_.assign(_.cloneDeep(this.props.opts.style.value), defaultStyle)}>
                {this.props.opts.base.value.text.value}
            </div>
        )
    }
})


module.exports = Text