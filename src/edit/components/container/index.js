const React = require('react')
const $ = require('jquery')
const _ = require('lodash')
const Edit = require('../../phone-edit/edit')
const LayoutBox = require('../../components/layout-box')
const LayoutBoxAbsolute = require('../../components/layout-box-absolute')
const Components = require('../../components')
const editStore = require('../../stores/edit-store')
const pureRenderMixin = require('../mixins/pure-render')
const mergeOptsMixin = require('../mixins/merge-opts')

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
                        background: 'white',
                        width: 500
                    },
                    edit: 'style'
                }
            }
        }
    },

    componentDidMount: function () {
        if (this.props.mode === 'edit') {
            editStore.addSelectContainerListener(this.onSelectContainer)
        }
    },

    componentWillUnmount: function () {
        if (this.props.mode === 'edit') {
            editStore.removeSelectContainerListener(this.onSelectContainer)
        }
    },

    onSelectContainer: function () {
        // 保证上一个dispatcher已完成
        setTimeout(()=> {
            this.props.edit.onClick()
        })
    },

    // 获得子元素的edit引用
    getChildsEdit: function () {
        return this.childEdits
    },

    render: function () {
        const defaultStyle = {
            minHeight: 800,
            position: 'relative'
        }

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
                <div>
                    <div style={_.assign(this.mergedOpts.flex.value,this.mergedOpts.base.value,defaultStyle)}>
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
                <div>
                    <div style={_.assign(this.mergedOpts.flex.value,this.mergedOpts.base.value,defaultStyle)}>
                        {children}
                    </div>
                </div>
            )
        }

    }
})

module.exports = Container