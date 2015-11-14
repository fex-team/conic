const React = require('react')
const Menu = require('antd/lib/menu')
const SubMenu = Menu.SubMenu
const reactRouter = require('react-router')
const Link = reactRouter.Link
const classnames = require('classnames')
const editStore = require('../../../stores/edit-store')
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
    },

    componentWillUnmount: function () {
        editStore.removeChangeShowModeListener(this.changeMode)
    },

    changeMode: function () {
        this.setState({
            mode: editStore.getShowMode()
        })
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
            <div>
                <div className="g-bd2 f-cb">
                    <div className="g-mn2">
                        <div className="g-mnc2">
                            <Menu mode="horizontal">
                                <Menu.Item>
                                    <Link to="/">Gaea平台</Link>
                                </Menu.Item>
                                <SubMenu title={<span>项目</span>}>
                                    <Menu.Item key="setting:1">设置</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </div>
                    </div>
                    <div className={sd2Class}>
                        <Publish/>
                        <Preview/>
                        <History/>
                    </div>
                    <div className={sd2PreviewClass}>
                        <Edit/>
                    </div>
                </div>
            </div>
        )
    }
})