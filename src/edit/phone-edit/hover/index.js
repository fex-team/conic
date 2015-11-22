const React = require('react')
const editStore = require('../../stores/edit-store')
const historyStore = require('../../stores/history-store')
const $ = require('jquery')
require('./index.scss')

const defaultStyle = {
    position: 'absolute',
    border: '2px dotted #2DB7F5',
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
        editStore.addChangeHoverDomListener(this.onHoverDomChange)
        editStore.addStartDropComponentListener(this.onDragStart)
        editStore.addFinishDropComponentListener(this.onDragEnd)
    },

    componentWillUnmount: function () {
        editStore.removeChangeHoverDomListener(this.onHoverDomChange)
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

    onHoverDomChange: function () {
        let $componentDom = editStore.get$hoverDom()
        let newStyle

        // 正在选中的不作hover效果
        let selectorUniqueKey = editStore.get() && editStore.get().props.uniqueKey && editStore.get() && editStore.get().props.uniqueKey || false
        let hoverUniqueKey = editStore.getHoverComponent() && editStore.getHoverComponent().props.uniqueKey && editStore.getHoverComponent().props.uniqueKey || false

        if ($componentDom && !(selectorUniqueKey && hoverUniqueKey && hoverUniqueKey === selectorUniqueKey)) {
            newStyle = {
                left: $componentDom.offset().left - editStore.getContainerDom().offset().left,
                top: $componentDom.offset().top - editStore.getContainerDom().offset().top,
                width: $componentDom.width(),
                height: $componentDom.height(),
                display: 'block'
            }

            if (editStore.getHoverComponent().props.children.props.name === 'LayoutBoxAbsolute') {
                newStyle.borderColor = '#A900FF'
            } else {
                newStyle.borderColor = '#2DB7F5'
            }
        } else {
            newStyle = {
                display: 'none'
            }
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