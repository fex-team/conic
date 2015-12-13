const React = require('react');
const Select = require('antd/lib/select');
const Option = Select.Option;
const Switch = require('antd/lib/switch');
const Json = require('../lib/json');

const selectWidth = 150;

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

    onChange: function (key, value) {
        let newItem = this.state.item;
        newItem.value[key] = value;

        this.setState({
            item: newItem
        }, function () {
            this.props.onChange(this.state.item, {
                name: '修改网络配置'
            });
        });
    },

    render: function () {
        return React.createElement(
            'div',
            { className: 'ant-form-horizontal' },
            React.createElement(
                'div',
                { className: 'ant-form-item' },
                React.createElement(
                    'label',
                    { htmlFor: 'control-input',
                        className: 'col-8' },
                    '触发条件'
                ),
                React.createElement(
                    'div',
                    { className: 'col-14' },
                    React.createElement(
                        Select,
                        { value: this.state.item.value.trigger,
                            style: { width: selectWidth },
                            onChange: this.onChange.bind(this, 'trigger') },
                        React.createElement(
                            Option,
                            { value: 'init' },
                            '初始化'
                        ),
                        React.createElement(
                            Option,
                            { value: 'event' },
                            '事件'
                        )
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'ant-form-item' },
                React.createElement(
                    'label',
                    { htmlFor: 'control-input',
                        className: 'col-8' },
                    '请求地址'
                ),
                React.createElement(
                    'div',
                    { className: 'col-14' },
                    React.createElement('input', { type: 'text',
                        value: this.state.item.value.url,
                        onChange: this.onChange,
                        className: 'ant-input',
                        id: 'control-input' })
                )
            ),
            React.createElement(
                'div',
                { className: 'ant-form-item' },
                React.createElement(
                    'label',
                    { htmlFor: 'control-input',
                        className: 'col-8' },
                    '模拟请求'
                ),
                React.createElement(
                    'div',
                    { className: 'col-14' },
                    React.createElement(Switch, { checked: this.state.item.value.mock,
                        onChange: this.onChange.bind(this, 'mock') })
                )
            ),
            this.state.item.value.mock ? React.createElement(Json, { title: '响应内容' }) : null
        );
    }
});