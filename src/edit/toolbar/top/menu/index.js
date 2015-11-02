const React = require('react')
const Menu = require('antd/lib/menu')
const SubMenu = Menu.SubMenu
require('./index.scss')

module.exports = React.createClass({
    getInitialState: function () {
        return {}
    },

    render: function () {
        return (
            <div>
                <div className="layout">
                    <Menu mode="horizontal">
                        <Menu.Item>
                            Gaea平台
                        </Menu.Item>
                        <SubMenu title={<span>项目</span>}>
                            <Menu.Item key="setting:1">设置</Menu.Item>
                        </SubMenu>
                        <Menu.Item>
                            <i className="fa fa-reply"></i>
                        </Menu.Item>
                        <Menu.Item>
                            <i className="fa fa-share"></i>
                        </Menu.Item>
                    </Menu>
                </div>
            </div>
        )
    }
})