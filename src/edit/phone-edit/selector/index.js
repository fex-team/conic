const React = require('react')
const editStore = require('../../stores/edit-store')
const historyStore = require('../../stores/history-store')
const $ = require('jquery')
const ReactDOM = require('react-dom')
require('./index.scss')

const defaultStyle = {
    position: 'absolute',
    border: '2px solid #2DB7F5',
    zIndex: 1000,
    transition: 'all 0.1s ease',
    pointerEvents: 'none'
}

var Selector = React.createClass({
    getInitialState: function () {
        return {
            style: {
                left: -10,
                top: -10,
                width: 0,
                height: 0
            }
        }
    },

    componentDidMount: function () {
        this.$dom = $(ReactDOM.findDOMNode(this))
        editStore.addChangeListener(this.onSelectNewComponent)
        editStore.addAfterUpdateComponentListener(this.onSelectorChange)
        editStore.addStartDropComponentListener(this.onDragStart)
        editStore.addFinishDropComponentListener(this.onDragEnd)
        editStore.addStartDropAbsoluteComponentListener(this.onDragStart)
        editStore.addFinishDropAbsoluteComponentListener(this.onDragEnd)
        editStore.addRemoveCurrentListener(this.onRemoveComponent)
        editStore.addUpdateSelectorListener(this.onSelectorChange)
    },

    componentWillUnmount: function () {
        editStore.removeChangeListener(this.onSelectNewComponent)
        editStore.removeAfterUpdateComponentListener(this.onSelectorChange)
        editStore.removeStartDropComponentListener(this.onDragStart)
        editStore.removeFinishDropComponentListener(this.onDragEnd)
        editStore.removeStartDropAbsoluteComponentListener(this.onDragStart)
        editStore.removeFinishDropAbsoluteComponentListener(this.onDragEnd)
        editStore.removeRemoveCurrentListener(this.onRemoveComponent)
        editStore.removeUpdateSelectorListener(this.onSelectorChange)
    },

    // 拖拽开始
    onDragStart: function () {
        // 隐藏selector组件
        this.setState({
            style: $.extend(true, defaultStyle, {
                display: 'none'
            })
        })
    },

    // 拖拽结束
    onDragEnd: function () {
        // 显示selector组件
        setTimeout(()=> {
            this.setState({
                style: $.extend(true, defaultStyle, {
                    display: 'block'
                })
            })
        }, 400)
    },

    // 组件被删除
    onRemoveComponent: function () {
        this.setState({
            style: $.extend(true, defaultStyle, {
                display: 'none'
            })
        })
    },

    onSelectNewComponent: function () {
        // 选中空组件无效
        if (editStore.get() === null)return

        this.onSelectorChange()
    },

    onSelectorChange: function () {
        let $componentDom = editStore.get$dom()

        let newStyle = {
            left: $componentDom.offset().left - editStore.get$ContainerDom().offset().left,
            top: $componentDom.offset().top - editStore.get$ContainerDom().offset().top,
            width: $componentDom.width(),
            height: $componentDom.height(),
            display: 'block'
        }

        if (editStore.get().props.children.props.name === 'LayoutBoxAbsolute') {
            newStyle.borderColor = '#A900FF'
        } else {
            newStyle.borderColor = '#2DB7F5'
        }

        this.setState({
            style: $.extend(true, defaultStyle, newStyle)
        })
    },

    render: function () {
        return (
            <div _namespace
                 style={this.state.style}></div>
        )
    }
})

module.exports = Selector