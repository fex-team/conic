const React = require('react')
const layoutMixin = require('../mixins/layout')
const pureRenderMixin = require('../mixins/pure-render')
const mergeOptsMixin = require('../mixins/merge-opts')

let LayoutBox = React.createClass({
    mixins: [layoutMixin, pureRenderMixin, mergeOptsMixin],

    getDefaultProps: function () {
        return {
            name: 'LayoutBox',
            desc: '万能矩形',
            defaultOpts: {
                flex: {
                    edit: 'flex',
                    value: {
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'nowrap',
                        justifyContent: 'flex-start',
                        alignItems: 'stretch'
                    }
                },
                style: {
                    value: {
                        margin: 0,
                        padding: 0,
                        width: '100%',
                        height: 50,
                        fontSize: 14,
                        color: '#333',
                        background: 'white'
                    },
                    edit: 'style'
                }
            }
        }
    },

    getSelfComponent: function () {
        return LayoutBox
    },

    render: function () {
        return (
            <div namespace
                 style={_.assign(this.mergedOpts.flex.value,this.mergedOpts.style.value)}>
                {this.getChildrens()}
            </div>
        )
    }
})

module.exports = LayoutBox