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
    },

    componentWillUnmount: function () {
        editStore.removeChangeListener(this.onSelectorChange)
        editStore.removeAfterUpdateComponentListener(this.onSelectorChange)
    },

    onSelectorChange: function () {
        let $componentDom = editStore.get$dom()
        let newStyle = {
            left: $componentDom.offset().left - historyStore.get$ContainerEditDom().offset().left - 1,
            top: $componentDom.offset().top - historyStore.get$ContainerEditDom().offset().top - 1,
            width: $componentDom.width() + 2,
            height: $componentDom.height() + 2
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