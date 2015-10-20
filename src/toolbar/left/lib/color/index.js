var React = require('react')
var ColorPicker = require('react-color')
require('./index.scss')

module.exports = React.createClass({
    getInitialState: function () {
        return {
            show: false
        }
    },

    handleChange: function (color) {
        let rgba = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
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
                    <div style={{backgroundColor: this.props.value}}
                         className="color"></div>
                </div>
                <ColorPicker positionCSS={popupPosition}
                             color={this.props.value}
                             display={this.state.show}
                             onChange={this.handleChange}
                             onClose={this.handleClose}
                             type="chrome"/>
            </div>
        )
    }
})