const React = require('react')
const layoutMixin = require('../mixins/layout')
const LayoutBox = require('../layout-box')
const pureRenderMixin = require('../mixins/pure-render')
const mergeOptsMixin = require('../mixins/merge-opts')

let LayoutBoxAbsolute = React.createClass({
    mixins: [layoutMixin, pureRenderMixin, mergeOptsMixin],

    getDefaultProps: function () {
        return {
            name: 'LayoutBoxAbsolute',
            desc: '自由矩形',
            defaultOpts: {
                position: {
                    value: {
                        left: 0,
                        top: 0
                    },
                    edit: 'position'
                },
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
                        width: 250,
                        height: 80,
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
        return LayoutBoxAbsolute
    },

    getLayoutBox: function () {
        return LayoutBox
    },

    render: function () {
        let style = {}
        switch (this.props.mode) {
        case 'edit':
            style = _.assign(this.mergedOpts.flex.value, this.mergedOpts.style.value)
            break
        case 'preview':
            style = _.assign(this.mergedOpts.flex.value, this.mergedOpts.style.value, this.mergedOpts.position.value)
            style.position = 'absolute'
            break
        }

        return (
            <div namespace
                 style={style}>
                {this.getChildrens()}
            </div>
        )
    }
})

module.exports = LayoutBoxAbsolute