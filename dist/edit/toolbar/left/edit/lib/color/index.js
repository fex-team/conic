var React = require('react');
var ColorBox = require('./color-box');
var ColorPicker = require('./color-picker');

module.exports = React.createClass({
    displayName: 'exports',

    getInitialState: function () {
        return {
            value: this.props.value,
            showPicker: false
        };
    },

    componentWillReceiveProps: function (nextProps) {
        if (this.state.value !== nextProps.value) {
            this.setState({
                value: nextProps.value
            });
        }
    },

    handleChange: function (color) {
        this.props.onChange(color);
    },

    onChangeShow: function () {
        this.setState({
            showPicker: !this.state.showPicker
        });
    },

    onChangeComplete: function (color) {
        this.setState({
            value: color
        });
        this.props.onChange(color, true);
    },

    render: function () {
        return React.createElement(
            'div',
            null,
            React.createElement(ColorBox, { onChangeShow: this.onChangeShow,
                color: this.state.value }),
            React.createElement(ColorPicker, { color: this.state.value,
                onChangeShow: this.onChangeShow,
                onChange: this.handleChange,
                onChangeComplete: this.onChangeComplete,
                show: this.state.showPicker })
        );
    }
});