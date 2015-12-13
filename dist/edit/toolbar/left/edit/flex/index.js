var React = require('react');
var Select = require('antd/lib/select');
var Option = Select.Option;
var editStore = require('../../../../stores/edit-store');

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
                name: '修改子元素布局方式'
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
                    '排列顺序'
                ),
                React.createElement(
                    'div',
                    { className: 'col-14' },
                    React.createElement(
                        Select,
                        { value: this.state.item.value.flexDirection,
                            style: { width: selectWidth },
                            onChange: this.onChange.bind(this, 'flexDirection') },
                        React.createElement(
                            Option,
                            { value: 'row' },
                            '从左到右'
                        ),
                        React.createElement(
                            Option,
                            { value: 'row-reverse' },
                            '从右到左'
                        ),
                        React.createElement(
                            Option,
                            { value: 'column' },
                            '从上到下'
                        ),
                        React.createElement(
                            Option,
                            { value: 'column-reverse' },
                            '从下到上'
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
                    '换行规则'
                ),
                React.createElement(
                    'div',
                    { className: 'col-14' },
                    React.createElement(
                        Select,
                        { value: this.state.item.value.flexWrap,
                            style: { width: selectWidth },
                            onChange: this.onChange.bind(this, 'flexWrap') },
                        React.createElement(
                            Option,
                            { value: 'nowrap' },
                            '不换行'
                        ),
                        React.createElement(
                            Option,
                            { value: 'wrap' },
                            '换行（换到下方）'
                        ),
                        React.createElement(
                            Option,
                            { value: 'wrap-reverse' },
                            '换行（换到上方）'
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
                    '主轴对齐方式'
                ),
                React.createElement(
                    'div',
                    { className: 'col-14' },
                    React.createElement(
                        Select,
                        { value: this.state.item.value.justifyContent,
                            style: { width: selectWidth },
                            onChange: this.onChange.bind(this, 'justifyContent') },
                        React.createElement(
                            Option,
                            { value: 'flex-start' },
                            '左对齐'
                        ),
                        React.createElement(
                            Option,
                            { value: 'flex-end' },
                            '右对齐'
                        ),
                        React.createElement(
                            Option,
                            { value: 'center' },
                            '居中'
                        ),
                        React.createElement(
                            Option,
                            { value: 'space-between' },
                            '两端对齐'
                        ),
                        React.createElement(
                            Option,
                            { value: 'space-around' },
                            '等边距'
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
                    '交叉轴布局'
                ),
                React.createElement(
                    'div',
                    { className: 'col-14' },
                    React.createElement(
                        Select,
                        { value: this.state.item.value.alignItems,
                            style: { width: selectWidth },
                            onChange: this.onChange.bind(this, 'alignItems') },
                        React.createElement(
                            Option,
                            { value: 'flex-start' },
                            '左对齐'
                        ),
                        React.createElement(
                            Option,
                            { value: 'flex-end' },
                            '右对齐'
                        ),
                        React.createElement(
                            Option,
                            { value: 'center' },
                            '居中'
                        ),
                        React.createElement(
                            Option,
                            { value: 'baseline' },
                            '第一行文字对齐'
                        ),
                        React.createElement(
                            Option,
                            { value: 'stretch' },
                            '拉伸'
                        )
                    )
                )
            )
        );
    }
});