var React = require('react')
var ColorPicker = require('react-color')
require('./index.scss')

module.exports = React.createClass({
    getInitialState: function () {
        return {
            show: false,
            color: this.props.value
        }
    },

    handleChange: function (color) {
        let rgba = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
        this.setState({
            color: rgba
        })
        this.props.onChange(rgba)
    },

    handleClose() {
        this.setState({show: false})
    },

    onClick: function () {
        this.setState({
            show: !this.state.show
        })
    },

    render: function () {
        let popupPosition = {
            position: 'absolute',
            top: '-120px',
            left: '10px'
        }

        return (
            <div>
                <div className="color-box"
                     onClick={this.onClick}>
                    <div style={{backgroundColor: this.state.color}}
                         className="color"></div>
                </div>
                <ColorPicker positionCSS={popupPosition}
                             color={this.state.color}
                             display={this.state.show}
                             onChange={this.handleChange}
                             onClose={this.handleClose}
                             type="chrome"/>
            </div>
        )
    }
})