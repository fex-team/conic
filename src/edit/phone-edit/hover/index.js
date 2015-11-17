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
    },

    componentWillUnmount: function () {
        editStore.removeChangeHoverDomListener(this.onHoverDomChange)
    },

    onHoverDomChange: function () {
        let $componentDom = editStore.get$hoverDom()
        let newStyle

        // 正在选中的不作hover效果
        let selectorUniqueKey = editStore.get() && editStore.get().props.uniqueKey && editStore.get() && editStore.get().props.uniqueKey || false
        let hoverUniqueKey = editStore.getHoverComponent() && editStore.getHoverComponent().props.uniqueKey && editStore.getHoverComponent().props.uniqueKey || false

        if ($componentDom && !(selectorUniqueKey && hoverUniqueKey && hoverUniqueKey === selectorUniqueKey)) {
            newStyle = {
                left: $componentDom.offset().left - historyStore.get$ContainerEditDom().offset().left - 1,
                top: $componentDom.offset().top - historyStore.get$ContainerEditDom().offset().top - 1,
                width: $componentDom.width() + 2,
                height: $componentDom.height() + 2,
                display: 'block'
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