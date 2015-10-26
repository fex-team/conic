var React = require('react')
var ColorPicker = require('react-color')
var colorAction = require('../action')

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
        let rgba = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
        this.props.onChange(rgba)
        colorAction.changeColor(rgba)
    },

    handleClose() {
        this.props.onChangeShow()
    },

    render: function () {
        let popupPosition = {
            position: 'absolute',
            top: '-120px',
            left: '10px'
        }

        return (
            <div>
                <ColorPicker positionCSS={popupPosition}
                             color={this.state.color}
                             display={this.state.showPicker}
                             onChange={this.handleChange}
                             onClose={this.handleClose}
                             type="chrome"/>
            </div>
        )
    }
})