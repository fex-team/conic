const React = require('react');
const Menu = require('antd/lib/menu');
const SubMenu = Menu.SubMenu;
const ReactRouter = require('react-router');
const Link = ReactRouter.Link;
const classNames = require('classnames');
const editStore = require('../../../stores/edit-store');
const viewAction = require('../../../actions/view-action');
const ViewType = require('./view-type');
const copyPasteAction = require('../../../actions/copy-paste-action');
const copyPasteStore = require('../../../stores/copy-paste-store');
const $ = require('jquery');
require('./index.scss');
require('./animate.scss');

const History = require('./history');
const Preview = require('./preview');
const Publish = require('./publish');
const Edit = require('./edit');

module.exports = React.createClass({
    displayName: 'exports',

    getInitialState: function () {
        return {
            mode: 'edit'
        };
    },

    componentDidMount: function () {
        editStore.addChangeShowModeListener(this.changeMode);

        // 保存按键
        $(document).bind('keydown', e => {
            if ((e.metaKey || e.ctrlKey) && e.keyCode == 83) {
                // ctrl+s or command+s

                e.preventDefault();
                return false;
            }
        });

        // 复制按键
        $(document).bind('keydown', e => {
            if ((e.metaKey || e.ctrlKey) && e.keyCode == 67) {
                // ctrl+c or command+c
                let $focus = $(':focus');
                if (!$focus.is('input') && !$focus.is('textarea')) {
                    copyPasteAction.copy();
                }
            }
        });

        // 粘贴按键
        $(document).bind('keydown', e => {
            if ((e.metaKey || e.ctrlKey) && e.keyCode == 86) {
                // ctrl+v or command+v
                let $focus = $(':focus');
                if (!$focus.is('input') && !$focus.is('textarea')) {
                    copyPasteAction.paste();
                }
            }
        });
    },

    componentWillUnmount: function () {
        $(document).unbind('keydown');
        editStore.removeChangeShowModeListener(this.changeMode);
    },

    changeMode: function () {
        this.setState({
            mode: editStore.getShowMode()
        });
    },

    handleClick: function (e) {
        if (e.key.indexOf(':') === -1) return;
        let infoArray = e.key.split(':');

        switch (infoArray[0]) {
            case 'view':
                viewAction.openView(infoArray[1]);
                break;
            case 'edit':
                switch (infoArray[1]) {
                    case 'copy':
                        copyPasteAction.copy();
                        break;
                    case 'paste':
                        copyPasteAction.paste();
                        break;
                }
                break;
        }
    },

    render: function () {
        let sd2Class = classNames({
            'g-sd2': true,
            'g-sd2-enter': this.state.mode === 'edit',
            'g-sd2-leave': this.state.mode === 'preview'
        });

        let sd2PreviewClass = classNames({
            'g-sd2': true,
            'g-sd2-preview-enter': this.state.mode === 'edit',
            'g-sd2-preview-leave': this.state.mode === 'preview'
        });

        return React.createElement(
            'div',
            { className: '_namespace' },
            React.createElement(
                'div',
                { className: 'g-bd2 f-cb' },
                React.createElement(
                    'div',
                    { className: 'g-mn2' },
                    React.createElement(
                        'div',
                        { className: 'g-mnc2' },
                        React.createElement(
                            Menu,
                            { mode: 'horizontal',
                                onClick: this.handleClick },
                            React.createElement(
                                Menu.Item,
                                null,
                                React.createElement(
                                    Link,
                                    { to: '/' },
                                    'Gaea平台'
                                )
                            ),
                            React.createElement(
                                SubMenu,
                                { title: React.createElement(
                                        'span',
                                        null,
                                        '项目'
                                    ) },
                                React.createElement(
                                    Menu.Item,
                                    { key: 'setting' },
                                    '设置'
                                )
                            ),
                            React.createElement(
                                SubMenu,
                                { title: React.createElement(
                                        'span',
                                        null,
                                        '视图'
                                    ) },
                                React.createElement(
                                    Menu.Item,
                                    { key: 'view:layoutTemplate' },
                                    '布局模板'
                                )
                            ),
                            React.createElement(
                                SubMenu,
                                { title: React.createElement(
                                        'span',
                                        null,
                                        '编辑'
                                    ) },
                                React.createElement(
                                    Menu.Item,
                                    { key: 'edit:copy' },
                                    '复制'
                                ),
                                React.createElement(
                                    Menu.Item,
                                    { key: 'edit:paste' },
                                    '粘贴'
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: sd2Class },
                    React.createElement(Publish, null),
                    React.createElement(Preview, null),
                    React.createElement(History, null)
                ),
                React.createElement(
                    'div',
                    { className: 'g-sd3' },
                    React.createElement(ViewType, null)
                ),
                React.createElement(
                    'div',
                    { className: sd2PreviewClass },
                    React.createElement(Edit, null)
                )
            )
        );
    }
});