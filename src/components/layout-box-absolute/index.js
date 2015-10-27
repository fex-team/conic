var React = require('react')
var $ = require('jquery')
var Components = require('../../components')
var Edit = require('../../phone-edit/edit')
var LayoutBox = require('../../components/layout-box')
var _ = require('lodash')

const defaultStyle = {
    position: 'absolute'
}

let LayoutBoxAbsolute = React.createClass({
    getDefaultProps: function () {
        return {
            name: 'LayoutBoxAbsolute',
            desc: '自由矩形',
            opts: {
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
    },

    getInitialState: function () {
        return {
            childs: this.props.childs
        }
    },

    componentWillMount: function () {
        // 为每个子组件生成uniqueKey
        this.state.childs.map((item, index)=> {
            item.uniqueKey = index
        })
    },

    render: function () {
        let children = this.state.childs.map((item, index)=> {
            let component = Components[item.name] || LayoutBoxAbsolute
            let Editprops = {
                key: item.uniqueKey,
                parent: this.props.edit || null,
                index: index,
                customOpts: item.opts || {},
                dragSource: true,
                childs: item.childs || []
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
            console.log(component, LayoutBox)
            return React.createElement(Edit, Editprops, React.createElement(component))
        })

        let nowStyle = Object.assign(this.props.opts.flex.value, this.props.opts.base.value)
        // 非编辑状态，将拖拽层的绝对定位、left top传给自身组件
        // 编辑状态，为了视觉效果统一，将绝对定位的absolute left top属性传给父拖拽父级
        if (!this.props.edit) {
            nowStyle = Object.assign(nowStyle, defaultStyle)
            nowStyle.left = this.props.opts.position.left
            nowStyle.right = this.props.opts.position.right
        }

        return (
            <div style={nowStyle}>
                {children}
            </div>
        )
    }
})

module.exports = LayoutBoxAbsolute