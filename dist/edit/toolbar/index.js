const React = require('react');
const Left = require('./left');
const Top = require('./top');
const Right = require('./right');
const Footer = require('./footer');
const editAction = require('../actions/edit-action');
const editStore = require('../stores/edit-store');
const settingAction = require('../actions/setting-action');
const settingStore = require('../stores/setting-store');
const classNames = require('classnames');

const defaultJson = require('../phone-edit/default.json');

const Center = require('./center');
const PhoneEdit = require('../../edit/phone-edit');

require('./index.scss');
require('./animate.scss');
require('./loading.scss');

let Container = React.createClass({
    displayName: 'Container',

    getInitialState: function () {
        return {
            // 操作页面中当前选中对象
            selection: {},

            // 页面模式
            mode: 'edit',

            // 是否加载完毕
            loading: true,

            tree: null,

            editKey: 0,
            previewKey: 0
        };
    },

    componentDidMount: function () {
        editStore.addChangeShowModeListener(this.changeMode);
        settingStore.addChangeTreeListener(this.changeTree);

        // :TODO 异步请求配置信息
        settingAction.setDefault({
            viewType: 'pc'
        }, defaultJson);
        setTimeout(() => {
            this.setState({
                loading: false,
                tree: defaultJson
            });
        }, 1000);
    },

    componentWillUnmount: function () {
        editStore.removeChangeShowModeListener(this.changeMode);
        settingStore.removeChangeTreeListener(this.changeTree);
    },

    changeMode: function () {
        let mode = editStore.getShowMode();
        let newState = {
            mode: mode
        };
        if (mode === 'preview') {
            newState.previewKey = this.state.previewKey + 1;
        }
        this.setState(newState);
    },

    changeTree: function () {
        this.setState({
            tree: settingStore.getTree(),
            editKey: this.state.editKey + 1
        });
    },

    render: function () {
        let sdClass = classNames({
            'g-sd': true,
            'g-sd-enter': this.state.mode === 'edit',
            'g-sd-leave': this.state.mode === 'preview'
        });

        let rdClass = classNames({
            'g-rd': true,
            'g-rd-enter': this.state.mode === 'edit',
            'g-rd-leave': this.state.mode === 'preview'
        });

        let ftClass = classNames({
            'g-ft': true,
            'g-ft-enter': this.state.mode === 'edit',
            'g-ft-leave': this.state.mode === 'preview'
        });

        let mnClass = classNames({
            'g-mn': true,
            'g-mn-leave': this.state.mode === 'preview'
        });

        let children;
        if (this.state.loading) {
            children = React.createElement(
                'div',
                { className: 'loading' },
                React.createElement('i', { className: 'fa fa-refresh fa-spin' })
            );
        } else {
            children = React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'g-hd' },
                    React.createElement(Top, null)
                ),
                React.createElement(
                    'div',
                    { className: sdClass },
                    React.createElement(Left, null)
                ),
                React.createElement(
                    'div',
                    { className: rdClass },
                    React.createElement(Right, null)
                ),
                React.createElement(
                    'div',
                    { className: mnClass },
                    React.createElement(Center, null),
                    React.createElement(
                        'div',
                        { className: 'phone-out' },
                        React.createElement(
                            'div',
                            { className: 'phone' },
                            React.createElement(PhoneEdit, { editKey: 'edit-' + this.state.editKey,
                                previewKey: 'preview-' + this.state.previewKey,
                                tree: this.state.tree })
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: ftClass },
                    React.createElement(Footer, null)
                )
            );
        }

        return React.createElement(
            'div',
            { className: '_namespace',
                style: { height: '100%' } },
            children
        );
    }
});

module.exports = Container;