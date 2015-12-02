var React = require('react')
var action = require('../action')
var colorStore = require('../store')
require('./index.scss')

module.exports = React.createClass({
    getInitialState: function () {
        return {
            color: this.props.color
        }
    },

    componentWillReceiveProps: function (nextProps) {
        if (this.state.color !== nextProps.color) {
            this.setState({
                color: nextProps.color
            })
        }
    },

    _onChangeColor: function () {
        if (colorStore.getBox() !== this) {
            return
        }
        this.setState({
            color: colorStore.getColor()
        })
    },

    componentDidMount: function () {
        colorStore.addChangeColorListener(this._onChangeColor)
    },

    componentWillUnmount: function () {
        colorStore.removeChangeColorListener(this._onChangeColor)
    },

    onClick: function () {
        action.changeBox(this)
        this.props.onChangeShow()
    },

    render: function () {
        return (
            <div _namespace>
                <div className="color-box"
                     onClick={this.onClick}>
                    <div style={{backgroundColor: this.state.color}}
                         className="color"></div>
                </div>
            </div>
        )
    }
})