const React = require('react')
const Menu = require('antd/lib/menu')
const SubMenu = Menu.SubMenu
const reactRouter = require('react-router')
const Link = reactRouter.Link
require('./index.scss')

const History = require('./history')
const Preview = require('./preview')
const Publish = require('./publish')

module.exports = React.createClass({
    getInitialState: function () {
        return {}
    },

    render: function () {
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
                    <div className="g-sd2">
                        <Publish/>
                        <Preview/>
                        <History/>
                    </div>
                </div>
            </div>
        )
    }
})