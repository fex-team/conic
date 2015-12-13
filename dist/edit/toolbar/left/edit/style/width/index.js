const React = require('react');
const InputNumber = require('antd/lib/input-number');
const _ = require('lodash');
const classNames = require('classnames');
require('./index.scss');

const normalWidth = 80;

// 存储px/scale/auto值
let cacheValue = {
    px: null,
    scale: null,
    auto: null
};

// 判断当前宽度类型
function getType(allStyle, value) {
    let type;

    if (!_.isNumber(value)) {
        type = 'scale';
    }

    if (allStyle.flexGrow) {
        type = 'auto';
    }

    return type || 'px';
}

// 宽度转化为数字 100%
function widthToNumber(allStyle, value) {
    if (allStyle.flexGrow) {
        cacheValue.auto = allStyle.flexGrow;
        return cacheValue.auto;
    }

    if (_.isString(value)) {
        cacheValue.scale = _.parseInt(value.replace('%', ''));
        return cacheValue.scale;
    } else {
        cacheValue.px = value;
        return cacheValue.px;
    }
}

module.exports = React.createClass({
    displayName: 'exports',

    getInitialState: function () {
        return {
            value: widthToNumber(this.props.allStyle, this.props.value),
            type: getType(this.props.allStyle, this.props.value)
        };
    },

    componentWillReceiveProps: function (nextProps) {
        if (this.state.value !== nextProps.value) {
            cacheValue = {
                px: null,
                scale: null,
                auto: null
            };
            this.setState({
                value: widthToNumber(nextProps.allStyle, nextProps.value),
                type: getType(nextProps.allStyle, nextProps.value)
            });
        }
    },

    onChange: function (value) {
        cacheValue[this.state.type] = value;
        this.changeParentOpts(this.state.type, value);
    },

    changeType: function (type) {
        let newValue = 0;
        switch (type) {
            case 'px':
                newValue = cacheValue[type] || 100;
                break;
            case 'scale':
                newValue = cacheValue[type] || 50;
                break;
            case 'auto':
                newValue = cacheValue[type] || 1;
                break;
        }

        this.setState({
            type: type,
            value: newValue
        }, function () {
            this.changeParentOpts(this.state.type, this.state.value);
        });
    },

    changeParentOpts: function (type, value) {
        switch (this.state.type) {
            case 'px':
                this.props.onChange(value);
                break;
            case 'scale':
                if (value > 100) {
                    value = 100;
                }
                this.setState({
                    value: value
                }, function () {
                    this.props.onChange(value + '%');
                });
                break;
            case 'auto':
                this.props.onFlexGrowChange(value);
                break;
        }
    },

    render: function () {
        let pxClass = classNames({
            'mode-btn': true,
            'active': this.state.type === 'px'
        });
        let scaleClass = classNames({
            'mode-btn': true,
            'active': this.state.type === 'scale'
        });
        let autoClass = classNames({
            'mode-btn': true,
            'active': this.state.type === 'auto'
        });

        return React.createElement(
            'div',
            { className: '_namespace' },
            React.createElement(
                'div',
                { className: 'ant-form-item' },
                React.createElement(
                    'label',
                    { htmlFor: 'control-input',
                        className: 'col-8' },
                    '宽度'
                ),
                React.createElement(
                    'div',
                    { className: 'col-16 flex-center' },
                    React.createElement(InputNumber, {
                        type: 'text',
                        value: this.state.value,
                        style: { width: normalWidth },
                        onChange: this.onChange,
                        className: 'ant-input',
                        id: 'control-input' }),
                    React.createElement(
                        'div',
                        { style: { marginLeft: 3 },
                            className: pxClass,
                            onClick: this.changeType.bind(this, 'px') },
                        'PX'
                    ),
                    React.createElement(
                        'div',
                        { style: { borderLeft: 'none' },
                            className: scaleClass,
                            onClick: this.changeType.bind(this, 'scale') },
                        '%'
                    ),
                    React.createElement(
                        'div',
                        { style: { borderLeft: 'none' },
                            className: autoClass,
                            onClick: this.changeType.bind(this, 'auto') },
                        'AUTO'
                    )
                )
            )
        );
    }
});