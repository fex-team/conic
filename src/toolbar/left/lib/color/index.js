var React = require('react')
var ColorBox = require('./color-box')
var ColorPicker = require('./color-picker')

module.exports = React.createClass({
    getInitialState: function () {
        return {
            value: this.props.value,
            showPicker: false
        }
    },

    componentWillReceiveProps: function (nextProps) {
        if (this.state.value !== nextProps.value) {
            this.setState({
                value: nextProps.value
            })
        }
    },

    handleChange: function (color) {
        this.props.onChange(color)
    },

    onChangeShow: function () {
        this.setState({
            showPicker: !this.state.showPicker
        })
    },

    render: function () {
        return (
            <div>
                <ColorBox onChangeShow={this.onChangeShow}
                          color={this.state.value}/>
                <ColorPicker color={this.state.value}
                             onChangeShow={this.onChangeShow}
                             onChange={this.handleChange}
                             show={this.state.showPicker}/>
            </div>
        )
    }
})