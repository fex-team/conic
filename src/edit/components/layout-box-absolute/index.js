const React = require('react')
const renderEdit = require('../mixins/render-edit')
const LayoutBox = require('../layout-box')
const pureRenderMixin = require('../mixins/pure-render')
const mergeOptsMixin = require('../mixins/merge-opts')

const defaultStyle = {
    position: 'absolute'
}

let LayoutBoxAbsolute = React.createClass({
    mixins: [renderEdit, pureRenderMixin, mergeOptsMixin],

    getSelfComponent: function () {
        return LayoutBoxAbsolute
    },
    getLayoutBox: function () {
        return LayoutBox
    },
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
                base: {
                    value: {
                        margin: 0,
                        padding: 0,
                        width: 100,
                        height: 100,
                        fontSize: 14,
                        color: '#333',
                        background: 'white'
                    },
                    edit: 'style'
                }
            }
        }
    }
})

module.exports = LayoutBoxAbsolute