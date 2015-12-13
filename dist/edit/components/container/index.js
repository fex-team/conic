const React = require('react');
const $ = require('jquery');
const _ = require('lodash');
const Edit = require('../../phone-edit/edit');
const LayoutBox = require('../../components/layout-box');
const LayoutBoxAbsolute = require('../../components/layout-box-absolute');
const Components = require('../../components');
const editStore = require('../../stores/edit-store');
const settingStore = require('../../stores/setting-store');
const layoutMixin = require('../mixins/layout');
const pureRenderMixin = require('../mixins/pure-render');
const mergeOptsMixin = require('../mixins/merge-opts');

const defaultStyle = {
    position: 'relative'
};

let Container = React.createClass({
    displayName: 'Container',

    mixins: [layoutMixin, pureRenderMixin, mergeOptsMixin],

    getDefaultProps: function () {
        return {
            name: 'Container',
            desc: '手机壳',
            defaultOpts: {
                flex: {
                    edit: 'flex',
                    value: {
                        display: 'flex',
                        flexDirection: 'column',
                        flexWrap: 'nowrap',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start'
                    }
                },
                style: {
                    value: {
                        margin: 0,
                        padding: 0,
                        fontSize: 14,
                        color: '#333',
                        background: 'white',
                        minHeight: 1200,
                        height: null
                    },
                    edit: 'style'
                }
            }
        };
    },

    componentDidMount: function () {
        editStore.addSelectContainerListener(this.onSelectContainer);
    },

    componentWillUnmount: function () {
        editStore.removeSelectContainerListener(this.onSelectContainer);
    },

    onSelectContainer: function () {
        // 保证上一个dispatcher已完成
        setTimeout(() => {
            this.props.edit.onClick();
        });
    },

    getLayoutBox: function () {
        return LayoutBox;
    },

    getLayoutBoxAbsolute: function () {
        return LayoutBoxAbsolute;
    },

    render: function () {
        return React.createElement(
            'div',
            { className: '_namespace',
                style: _.assign(this.mergedOpts.flex.value, this.mergedOpts.style.value, defaultStyle) },
            this.getChildrens()
        );
    }
});

module.exports = Container;