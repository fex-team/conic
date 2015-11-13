const React = require('react')
const renderEdit = require('../mixins/render-edit')
const pureRenderMixin = require('../mixins/pure-render')
const mergeOptsMixin = require('../mixins/merge-opts')

let LayoutBox = React.createClass({
    mixins: [renderEdit, pureRenderMixin, mergeOptsMixin],

    getSelfComponent: function () {
        return LayoutBox
    },

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
                }
            }
        }
    }
})

module.exports = LayoutBox