const React = require('react')
const editStore = require('../../stores/edit-store')
const historyStore = require('../../stores/history-store')
const $ = require('jquery')
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
        editStore.addChangeListener(this.onSelectorChange)
        editStore.addAfterUpdateComponentListener(this.onSelectorChange)
        editStore.addStartDropComponentListener(this.onDragStart)
        editStore.addFinishDropComponentListener(this.onDragEnd)
    },

    componentWillUnmount: function () {
        editStore.removeChangeListener(this.onSelectorChange)
        editStore.removeAfterUpdateComponentListener(this.onSelectorChange)
        editStore.removeStartDropComponentListener(this.onDragStart)
        editStore.removeFinishDropComponentListener(this.onDragEnd)
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

    onSelectorChange: function () {
        let $componentDom = editStore.get$dom()
        let newStyle = {
            left: $componentDom.offset().left - historyStore.get$ContainerEditDom().offset().left,
            top: $componentDom.offset().top - historyStore.get$ContainerEditDom().offset().top,
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
            <div namespace
                 style={this.state.style}>

            </div>
        )
    }
})

module.exports = Selector