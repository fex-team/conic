var React = require('react')
var ReactColor = require('react-color')
var colorAction = require('../action')

function getRGBA(color) {
    return `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
}

module.exports = React.createClass({
    getInitialState: function () {
        return {
            color: this.props.color,
            showPicker: this.props.show
        }
    },

    componentWillReceiveProps: function (nextProps) {
        if (this.state.color !== nextProps.color || this.state.show !== nextProps.show) {
            this.setState({
                color: nextProps.color,
                showPicker: nextProps.show
            })
        }
    },

    handleChange: function (color) {
        let rgba = getRGBA(color)
        this.props.onChange(rgba)
        colorAction.changeColor(rgba)
    },

    handleChangeComplete: function (color) {
        let rgba = getRGBA(color)
        this.props.onChangeComplete(rgba)
    },

    handleClose() {
        this.props.onChangeShow()
    },

    render: function () {
        let popupPosition = {
            position: 'absolute',
            top: -250,
            left: -95
        }

        return (
            <div>
                <ReactColor positionCSS={popupPosition}
                             color={this.state.color}
                             display={this.state.showPicker}
                             onChange={this.handleChange}
                             onChangeComplete={this.handleChangeComplete}
                             onClose={this.handleClose}
                             type="chrome"/>
            </div>
        )
    }
})