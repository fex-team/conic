const React = require('react');
const layoutMixin = require('../mixins/layout');
const pureRenderMixin = require('../mixins/pure-render');
const mergeOptsMixin = require('../mixins/merge-opts');

let LayoutBox = React.createClass({
    displayName: 'LayoutBox',

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
                        alignItems: 'flex-start'
                    }
                },
                style: {
                    value: {
                        margin: 0,
                        padding: 0,
                        width: '100%',
                        minHeight: 50,
                        height: null,
                        fontSize: 14,
                        color: '#333',
                        background: 'white'
                    },
                    edit: 'style'
                },
                network: {
                    value: {
                        url: 'http://www.baidu.com',
                        trigger: 'init',
                        data: {
                            a: 1,
                            b: 2
                        },
                        mock: false
                    },
                    edit: 'network'
                }
            }
        };
    },

    getSelfComponent: function () {
        return LayoutBox;
    },

    render: function () {
        return React.createElement(
            'div',
            { className: '_namespace',
                style: _.assign(this.mergedOpts.flex.value, this.mergedOpts.style.value) },
            this.getChildrens()
        );
    }
});

module.exports = LayoutBox;