const React = require('react')
const $ = require('jquery')
const _ = require('lodash')
const Edit = require('../../phone-edit/edit')
const LayoutBox = require('../../components/layout-box')
const LayoutBoxAbsolute = require('../../components/layout-box-absolute')
const Components = require('../../components')
const editStore = require('../../stores/edit-store')
const settingStore = require('../../stores/setting-store')
const pureRenderMixin = require('../mixins/pure-render')
const mergeOptsMixin = require('../mixins/merge-opts')

const defaultStyle = {
    minHeight: 800,
    position: 'relative'
}

const editStyle = {}

function handleViewTypeChange() {
    switch (settingStore.getViewType()) {
    case 'pc':
        editStyle.width = 600
        break
    case 'mobile':
        editStyle.width = 500
        break
    }
}

let Container = React.createClass({
    mixins: [pureRenderMixin, mergeOptsMixin],

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
                base: {
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
            handleViewTypeChange()
            break
        case 'preview':
            handleViewTypeChange()
            break
        }
    },

    componentDidMount: function () {
        switch (this.props.mode) {
        case 'edit':
            editStore.addSelectContainerListener(this.onSelectContainer)
            settingStore.addViewTypeListener(this.viewTypeChange)
            handleViewTypeChange()
            break
        case 'preview':
            settingStore.addViewTypeListener(this.viewTypeChange)
            handleViewTypeChange()
            break
        }
    },

    componentWillUnmount: function () {
        switch (this.props.mode) {
        case 'edit':
            editStore.removeSelectContainerListener(this.onSelectContainer)
            settingStore.removeViewTypeListener(this.viewTypeChange)
            handleViewTypeChange()
            break
        case 'preview':
            settingStore.removeViewTypeListener(this.viewTypeChange)
            handleViewTypeChange()
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
        handleViewTypeChange()
        this.forceUpdate()
    },

    // 获得子元素的edit引用
    getChildsEdit: function () {
        return this.childEdits
    },

    render: function () {
        let childs = this.props.childs || []
        let children

        switch (this.props.mode) {
        case 'edit':
            // 存储子元素的edit引用清空
            this.childEdits = []

            children = childs.map((item, index)=> {
                let component = Components[item.name]
                let Editprops = {
                    key: item.uniqueKey,
                    uniqueKey: item.uniqueKey,
                    parent: this.props.edit || null,
                    index: index,
                    opts: item.opts || {},
                    dragSource: true,
                    childs: item.childs || [],
                    selected: item.selected || false,
                    ref: (ref)=> {
                        if (ref === null)return
                        this.childEdits.push(ref)
                    }
                }
                if (item.name === 'LayoutBox') {
                    component = LayoutBox
                    Editprops.dragTarget = true
                }
                if (item.name === 'LayoutBoxAbsolute') {
                    component = LayoutBoxAbsolute
                    Editprops.dragSource = false
                    Editprops.dragSourceAbsolute = true
                    Editprops.dragTarget = true
                }
                return React.createElement(Edit, Editprops, React.createElement(component))
            })

            return (
                <div namespace>
                    <div style={_.assign(this.mergedOpts.flex.value,this.mergedOpts.base.value,defaultStyle,editStyle)}>
                        {children}
                    </div>
                </div>
            )

        case 'preview':
            children = childs.map((item, index)=> {
                let component = Components[item.name]

                switch (item.name) {
                case 'LayoutBox':
                    component = LayoutBox
                    break
                case'LayoutBoxAbsolute':
                    component = LayoutBoxAbsolute
                    break
                }

                return React.createElement(component, {
                    key: index,
                    opts: item.opts,
                    childs: item.childs,
                    mode: 'preview'
                })
            })

            return (
                <div namespace>
                    <div style={_.assign(this.mergedOpts.flex.value,this.mergedOpts.base.value,defaultStyle,editStyle)}>
                        {children}
                    </div>
                </div>
            )
        }

    }
})

module.exports = Container