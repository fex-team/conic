const React = require('react');
const Select = require('antd/lib/select');
const Option = Select.Option;
const Checkbox = require('antd/lib/checkbox');
const Radio = require('antd/lib/radio');
const RadioGroup = require('antd/lib/radio/group');
const $ = require('jquery');
const _ = require('lodash');
const editStore = require('../../../stores/edit-store');
const editAction = require('../../../actions/edit-action');
const Collapse = require('antd/lib/collapse');
const Panel = Collapse.Panel;
require('./index.scss');

const Custom = require('./custom');
const Flex = require('./flex');
const Style = require('./style');
const Position = require('./position');
const Network = require('./network');

const AddScript = require('./add-script');

let currentComponentOpts = null;
let currentComponentDesc = null;

module.exports = React.createClass({
    displayName: 'exports',

    getInitialState: function () {
        return {};
    },

    onComponentChange: function () {
        let component = editStore.get();
        if (component) {
            currentComponentDesc = component.props.children.props.desc || '未命名组件';
            currentComponentOpts = $.extend(true, _.cloneDeep(component.props.children.props.defaultOpts), _.cloneDeep(component.state.customOpts));
        } else {
            currentComponentOpts = currentComponentDesc = null;
        }
        this.forceUpdate();
    },

    componentDidMount: function () {
        editStore.addChangeListener(this.onComponentChange);
        $(document).on('keydown', e => {
            if ((e.metaKey || e.ctrlKey) && e.keyCode == 8) {
                // ctrl + backspace || command + delete
                e.preventDefault();

                if (currentComponentDesc === '手机壳') return;

                this.removeSelf();

                return false;
            }
        });
    },

    componentWillUnmount: function () {
        editStore.removeChangeListener(this.onComponentChange);
    },

    onEditChange: function (key, value, historyInfo) {
        let opts = {
            [key]: value
        };
        editAction.updateComponent(opts, historyInfo);
    },

    removeSelf: function () {
        editAction.removeCurrent();
        currentComponentOpts = null;
        this.forceUpdate();
    },

    render: function () {
        const animation = {
            enter: {
                type: 'bottom'
            }
        };

        let editForm;
        let collapseDefaultActiveKeys = [];

        if (currentComponentOpts !== null) {
            // 解析编辑项目
            editForm = Object.keys(currentComponentOpts).map((key, index) => {
                collapseDefaultActiveKeys.push(index.toString());

                let item = currentComponentOpts[key];
                switch (item.edit) {
                    case 'custom':
                        return React.createElement(
                            Panel,
                            { header: item.title,
                                key: index },
                            React.createElement(Custom, { item: item.value,
                                onChange: this.onEditChange.bind(this, key) })
                        );

                    case 'flex':
                        return React.createElement(
                            Panel,
                            { header: `子元素布局`,
                                key: index },
                            React.createElement(Flex, { item: item,
                                onChange: this.onEditChange.bind(this, key) })
                        );

                    case 'style':
                        return React.createElement(
                            Panel,
                            { header: `样式`,
                                key: index },
                            React.createElement(Style, { item: item,
                                onChange: this.onEditChange.bind(this, key) })
                        );

                    case 'position':
                        return React.createElement(
                            Panel,
                            { header: `位置`,
                                key: index },
                            React.createElement(Position, { item: item,
                                onChange: this.onEditChange.bind(this, key) })
                        );

                    case 'network':
                        return React.createElement(
                            Panel,
                            { header: `网络`,
                                key: index },
                            React.createElement(Network, { item: item,
                                onChange: this.onEditChange.bind(this, key) })
                        );
                }
            });

            // 包装动画
            editForm = React.createElement(
                'div',
                { key: 'edit-form' },
                React.createElement(
                    'div',
                    { className: 'component-name' },
                    currentComponentDesc === '手机壳' ? React.createElement(
                        'div',
                        { className: 'out-bg' },
                        React.createElement('i', { className: 'fa fa-cube',
                            style: { marginRight: 5 } }),
                        '手机壳'
                    ) : React.createElement(
                        'div',
                        { onClick: this.removeSelf,
                            className: 'delete-btn' },
                        React.createElement('i', { className: 'fa fa-cube',
                            style: { marginRight: 5 } }),
                        currentComponentDesc,
                        React.createElement('i', { className: 'fa fa-remove',
                            style: { marginLeft: 5 } })
                    )
                ),
                React.createElement(
                    Collapse,
                    { defaultActiveKey: collapseDefaultActiveKeys },
                    editForm
                ),
                React.createElement(AddScript, null)
            );
        } else {
            editForm = React.createElement(
                'div',
                { key: 'empty',
                    className: 'nothing' },
                React.createElement(
                    'div',
                    { className: 'bold' },
                    '编辑组件'
                ),
                React.createElement(
                    'div',
                    null,
                    '请选中一个组件'
                )
            );
        }

        return React.createElement(
            'div',
            { className: '_namespace' },
            editForm
        );
    }
});