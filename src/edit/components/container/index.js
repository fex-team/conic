var React = require('react')
var $ = require('jquery')
var _ = require('lodash')
var Edit = require('../../phone-edit/edit')
var LayoutBox = require('../../components/layout-box')
var LayoutBoxAbsolute = require('../../components/layout-box-absolute')
var Components = require('../../components')
var editStore = require('../../stores/edit-store')
const pureRenderMixin = require('../mixins/pureRenderMixin')

let Container = React.createClass({
    mixins: [pureRenderMixin],

    getDefaultProps: function () {
        return {
            name: 'Container',
            desc: '手机壳',
            opts: {
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

    onSelectContainer: function () {
        // 保证上一个dispatcher已完成
        setTimeout(()=> {
            this.props.edit.onClick()
        })
    },

    componentDidMount: function () {
        editStore.addSelectContainerListener(this.onSelectContainer)
    },

    componentWillUnmount: function () {
        editStore.removeSelectContainerListener(this.onSelectContainer)
    },

    // 获得子元素的edit引用
    getChildsEdit: function () {
        return this.childEdits
    },

    render: function () {
        // 存储子元素的edit引用清空
        this.childEdits = []

        let children = this.props.childs.map((item, index)=> {
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

        const defaultStyle = {
            minHeight: 800,
            position: 'relative'
        }

        return (
            <div>
                <div style={_.assign(this.props.opts.flex.value,this.props.opts.base.value,defaultStyle)}>
                    {children}
                </div>
            </div>
        )
    }
})

module.exports = Container