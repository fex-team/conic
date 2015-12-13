var React = require('react');
var action = require('../action');
var colorStore = require('../store');
require('./index.scss');

module.exports = React.createClass({
    displayName: 'exports',

    getInitialState: function () {
        return {
            color: this.props.color
        };
    },

    componentWillReceiveProps: function (nextProps) {
        if (this.state.color !== nextProps.color) {
            this.setState({
                color: nextProps.color
            });
        }
    },

    _onChangeColor: function () {
        if (colorStore.getBox() !== this) {
            return;
        }
        this.setState({
            color: colorStore.getColor()
        });
    },

    componentDidMount: function () {
        colorStore.addChangeColorListener(this._onChangeColor);
    },

    componentWillUnmount: function () {
        colorStore.removeChangeColorListener(this._onChangeColor);
    },

    onClick: function () {
        action.changeBox(this);
        this.props.onChangeShow();
    },

    render: function () {
        return React.createElement(
            'div',
            { className: '_namespace' },
            React.createElement(
                'div',
                { className: 'color-box',
                    onClick: this.onClick },
                React.createElement('div', { style: { backgroundColor: this.state.color },
                    className: 'color' })
            )
        );
    }
});