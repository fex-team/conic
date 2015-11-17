const React = require('react')
const $ = require('jquery')
const _ = require('lodash')
const Edit = require('../../phone-edit/edit')
const LayoutBox = require('../../components/layout-box')
const LayoutBoxAbsolute = require('../../components/layout-box-absolute')
const Components = require('../../components')
const editStore = require('../../stores/edit-store')
const settingStore = require('../../stores/setting-store')
const layoutMixin = require('../mixins/layout')
const pureRenderMixin = require('../mixins/pure-render')
const mergeOptsMixin = require('../mixins/merge-opts')

const defaultStyle = {
    minHeight: 1200,
    position: 'relative'
}

const editStyle = {}

function handleViewTypeChange(mode) {
    switch (settingStore.getViewType()) {
    case 'pc':
        switch (mode) {
        case 'edit':
            editStyle.width = $(window).width() - 250 - 7
            break
        case 'preview':
            editStyle.width = $(window).width() - 7
            break
        }
        break
    case 'mobile':
        editStyle.width = 500
        break
    }
}

let Container = React.createClass({
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
                        background: 'white'
                    },
                    edit: 'style'
                }
            }
        }
    },

    componentWillMount: function () {
        switch (this.props.mode) {
        case 'edit':
            handleViewTypeChange(this.props.mode)
            break
        case 'preview':
            handleViewTypeChange(this.props.mode)
            break
        }
    },

    componentDidMount: function () {
        switch (this.props.mode) {
        case 'edit':
            editStore.addSelectContainerListener(this.onSelectContainer)
            settingStore.addViewTypeListener(this.viewTypeChange)
            break
        case 'preview':
            settingStore.addViewTypeListener(this.viewTypeChange)
            break
        }
    },

    componentWillUnmount: function () {
        switch (this.props.mode) {
        case 'edit':
            editStore.removeSelectContainerListener(this.onSelectContainer)
            settingStore.removeViewTypeListener(this.viewTypeChange)
            break
        case 'preview':
            settingStore.removeViewTypeListener(this.viewTypeChange)
            break
        }
    },

    onSelectContainer: function () {
        // 保证上一个dispatcher已完成
        setTimeout(()=> {
            this.props.edit.onClick()
        })
    },

    viewTypeChange: function () {
        handleViewTypeChange(this.props.mode)
        this.forceUpdate()
    },

    getLayoutBox: function () {
        return LayoutBox
    },

    getLayoutBoxAbsolute: function () {
        return LayoutBoxAbsolute
    },

    render: function () {
        return (
            <div namespace
                 style={_.assign(this.mergedOpts.flex.value,this.mergedOpts.style.value,defaultStyle,editStyle)}>
                {this.getChildrens()}
            </div>
        )
    }
})

module.exports = Container