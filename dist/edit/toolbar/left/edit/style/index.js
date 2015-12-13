const React = require('react');
const Select = require('antd/lib/select');
const InputNumber = require('antd/lib/input-number');
const Color = require('../lib/color');
const Option = Select.Option;

const Background = require('./background');
const MarginPadding = require('./margin-padding');
const Width = require('./width');
const Height = require('./height');

const normalWidth = 150;

module.exports = React.createClass({
    displayName: 'exports',

    getInitialState: function () {
        return {
            item: this.props.item
        };
    },

    componentWillReceiveProps: function (nextProps) {
        if (this.state.item !== nextProps.item) {
            this.setState({
                item: nextProps.item
            });
        }
    },

    onChange: function (key, value, historyInfo) {
        let newItem = this.state.item;
        newItem.value[key] = value;
        this.props.onChange(newItem, historyInfo);
    },

    onWidthChange: function (key, value) {
        let newItem = this.state.item;
        newItem.value[key] = value;
        newItem.value['flexGrow'] = null;
        this.props.onChange(newItem, {
            name: `宽度改为 ${ value }`
        });
    },

    onHeightChange: function (key, value) {
        let newItem = this.state.item;
        newItem.value['height'] = value;
        newItem.value['minHeight'] = null;
        this.props.onChange(newItem, {
            name: `高度改为 ${ value }`
        });
    },

    onMinHeightChange: function (key, value) {
        let newItem = this.state.item;
        newItem.value['minHeight'] = value;
        newItem.value['height'] = null;
        this.props.onChange(newItem, {
            name: `高度改为 ${ value }， 可被撑开`
        });
    },

    onFontSizeChange: function (key, value) {
        let newItem = this.state.item;
        newItem.value[key] = value;
        this.props.onChange(newItem, {
            name: `字体大小改为 ${ value }`
        });
    },

    onFontColorChange: function (key, value, finish) {
        let newItem = this.state.item;
        newItem.value[key] = value;
        if (!finish) {
            this.props.onChange(newItem, null);
        } else {
            this.props.onChange(newItem, {
                name: `字体颜色改为 ${ value }`
            });
        }
    },

    onBgColorChange: function (key, value, finish) {
        let newItem = this.state.item;
        newItem.value[key] = value;
        if (!finish) {
            this.props.onChange(newItem, null);
        } else {
            this.props.onChange(newItem, {
                name: `背景颜色改为 ${ value }`
            });
        }
    },

    onFlexGrowChange: function (value) {
        let newItem = this.state.item;
        newItem.value['flexGrow'] = value;
        newItem.value['width'] = null;
        this.props.onChange(newItem, {
            name: `宽度改为自适应 ${ value }`
        });
    },

    render: function () {
        let forms = Object.keys(this.state.item.value).map(key => {
            var value = this.state.item.value[key];

            // 过滤掉null
            if (value === null) return;

            switch (key) {
                case 'width':
                    return React.createElement(Width, { key: key,
                        propKey: key,
                        value: value,
                        allStyle: this.state.item.value,
                        onChange: this.onWidthChange.bind(this, key),
                        onFlexGrowChange: this.onFlexGrowChange });
                case 'flexGrow':
                    return React.createElement(Width, { key: key,
                        propKey: key,
                        value: value,
                        allStyle: this.state.item.value,
                        onChange: this.onWidthChange.bind(this, key),
                        onFlexGrowChange: this.onFlexGrowChange });
                case 'height':
                    return React.createElement(Height, { key: key,
                        propKey: key,
                        value: value,
                        allStyle: this.state.item.value,
                        onHeightChange: this.onHeightChange.bind(this, key),
                        onMinHeightChange: this.onMinHeightChange.bind(this, key) });
                case 'minHeight':
                    return React.createElement(Height, { key: key,
                        propKey: key,
                        value: value,
                        allStyle: this.state.item.value,
                        onHeightChange: this.onHeightChange.bind(this, key),
                        onMinHeightChange: this.onMinHeightChange.bind(this, key) });
                case 'fontSize':
                    return React.createElement(
                        'div',
                        { key: key,
                            className: 'ant-form-item' },
                        React.createElement(
                            'label',
                            { htmlFor: 'control-input',
                                className: 'col-8' },
                            '字体大小'
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-16' },
                            React.createElement(InputNumber, { type: 'text',
                                value: value,
                                style: { width: normalWidth },
                                onChange: this.onFontSizeChange.bind(this, key),
                                className: 'ant-input',
                                id: 'control-input' })
                        )
                    );
                case 'background':
                    return React.createElement(Background, { key: key,
                        propKey: key,
                        value: value,
                        onChange: this.onBgColorChange.bind(this, key) });
                case 'color':
                    return React.createElement(
                        'div',
                        { key: key,
                            className: 'ant-form-item' },
                        React.createElement(
                            'label',
                            { htmlFor: 'control-input',
                                className: 'col-8' },
                            '字体颜色'
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-16' },
                            React.createElement(Color, { value: value,
                                onChange: this.onFontColorChange.bind(this, key) })
                        )
                    );
                case 'margin':
                    return React.createElement(MarginPadding, { key: key,
                        margin: this.state.item.value['margin'],
                        padding: this.state.item.value['padding'],
                        onChange: this.onChange });
            }
        });
        return React.createElement(
            'div',
            { className: 'ant-form-horizontal' },
            forms
        );
    }
});