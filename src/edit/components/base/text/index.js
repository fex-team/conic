const React = require('react')
const pureRenderMixin = require('../../mixins/pure-render')
const mergeOptsMixin = require('../../mixins/merge-opts')
const _ = require('lodash')

const defaultStyle = {
    wordBreak: 'break-all'
}

const Text = React.createClass({
    mixins: [pureRenderMixin, mergeOptsMixin],

    getDefaultProps: function () {
        return {
            name: 'BaseText',
            desc: '文字',
            defaultOpts: {
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

    render: function () {
        return (
            <div __namespace style={_.assign(this.mergedOpts.style.value, defaultStyle)}>
                {this.mergedOpts.base.value.text.value}
            </div>
        )
    }
})


module.exports = Text