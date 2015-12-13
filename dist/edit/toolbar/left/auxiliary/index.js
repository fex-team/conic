const React = require('react');
const Switch = require('antd/lib/switch');
const auxiliaryAction = require('../../../actions/auxiliary-action');

const Auxiliary = React.createClass({
    displayName: 'Auxiliary',

    getInitialState: function () {
        return {};
    },

    onChange: function (isOk) {
        auxiliaryAction.showLayoutBox(isOk);
    },

    render: function () {
        return React.createElement(
            'div',
            { className: '_namespace' },
            React.createElement(
                'form',
                { className: 'ant-form-horizontal' },
                React.createElement(
                    'div',
                    { className: 'ant-form-item' },
                    React.createElement(
                        'label',
                        { htmlFor: 'control-input',
                            className: 'col-10' },
                        '显示布局框：'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-14' },
                        React.createElement(Switch, { defaultChecked: false,
                            onChange: this.onChange })
                    )
                )
            )
        );
    }
});

module.exports = Auxiliary;