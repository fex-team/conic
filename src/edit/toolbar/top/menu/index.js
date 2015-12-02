const React = require('react')
const Menu = require('antd/lib/menu')
const SubMenu = Menu.SubMenu
const reactRouter = require('react-router')
const Link = reactRouter.Link
const classnames = require('classnames')
const editStore = require('../../../stores/edit-store')
const viewAction = require('../../../actions/view-action')
const ViewType = require('./view-type')
const copyPasteAction = require('../../../actions/copy-paste-action')
const copyPasteStore = require('../../../stores/copy-paste-store')
const $ = require('jquery')
require('./index.scss')
require('./animate.scss')

const History = require('./history')
const Preview = require('./preview')
const Publish = require('./publish')
const Edit = require('./edit')

module.exports = React.createClass({
    getInitialState: function () {
        return {
            mode: 'edit'
        }
    },

    componentDidMount: function () {
        editStore.addChangeShowModeListener(this.changeMode)

        // 保存按键
        $(document).bind('keydown', (e)=> {
            if ((e.metaKey || e.ctrlKey) && e.keyCode == 83) { // ctrl+s or command+s

                e.preventDefault()
                return false
            }
        })

        // 复制按键
        $(document).bind('keydown', (e)=> {
            if ((e.metaKey || e.ctrlKey) && e.keyCode == 67) { // ctrl+c or command+c
                let $focus = $(':focus')
                if (!$focus.is('input') && !$focus.is('textarea')) {
                    copyPasteAction.copy()
                }
            }
        })

        // 粘贴按键
        $(document).bind('keydown', (e)=> {
            if ((e.metaKey || e.ctrlKey) && e.keyCode == 86) { // ctrl+v or command+v
                let $focus = $(':focus')
                if (!$focus.is('input') && !$focus.is('textarea')) {
                    copyPasteAction.paste()
                }
            }
        })
    },

    componentWillUnmount: function () {
        $(document).unbind('keydown')
        editStore.removeChangeShowModeListener(this.changeMode)
    },

    changeMode: function () {
        this.setState({
            mode: editStore.getShowMode()
        })
    },

    handleClick: function (e) {
        if (e.key.indexOf(':') === -1)return
        let infoArray = e.key.split(':')

        switch (infoArray[0]) {
        case 'view':
            viewAction.openView(infoArray[1])
            break
        case 'edit':
            switch (infoArray[1]) {
            case 'copy':
                copyPasteAction.copy()
                break
            case 'paste':
                copyPasteAction.paste()
                break
            }
            break
        }
    },

    render: function () {
        let sd2Class = classnames({
            'g-sd2': true,
            'g-sd2-enter': this.state.mode === 'edit',
            'g-sd2-leave': this.state.mode === 'preview'
        })

        let sd2PreviewClass = classnames({
            'g-sd2': true,
            'g-sd2-preview-enter': this.state.mode === 'edit',
            'g-sd2-preview-leave': this.state.mode === 'preview'
        })

        return (
            <div _namespace>
                <div className="g-bd2 f-cb">
                    <div className="g-mn2">
                        <div className="g-mnc2">
                            <Menu mode="horizontal"
                                  onClick={this.handleClick}>
                                <Menu.Item>
                                    <Link to="/">Gaea平台</Link>
                                </Menu.Item>
                                <SubMenu title={<span>项目</span>}>
                                    <Menu.Item key="setting">设置</Menu.Item>
                                </SubMenu>
                                <SubMenu title={<span>视图</span>}>
                                    <Menu.Item key="view:layoutTemplate">布局模板</Menu.Item>
                                </SubMenu>
                                <SubMenu title={<span>编辑</span>}>
                                    <Menu.Item key="edit:copy">复制</Menu.Item>
                                    <Menu.Item key="edit:paste">粘贴</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </div>
                    </div>
                    <div className={sd2Class}>
                        <Publish/>
                        <Preview/>
                        <History/>
                    </div>
                    <div className="g-sd3">
                        <ViewType/>
                    </div>
                    <div className={sd2PreviewClass}>
                        <Edit/>
                    </div>
                </div>
            </div>
        )
    }
})