var React = require('react')
var Menu = require('./menu')
var Component = require('./component')
require('./index.scss')

module.exports = React.createClass({
    getInitialState: function () {
        return {
            // 当前菜单类型
            menuType: ''
        }
    },

    onChangeMenuType: function (type) {
        this.setState({
            menuType: type
        })
    },

    render: function () {
        return (
            <div>
                <div className="f-cb layout">
                    <div className="g-sd51">
                        <div className="table-response">
                            <Menu onChangeType={this.onChangeMenuType}/>
                        </div>
                    </div>
                    <div className="g-mn5">
                        <div className="g-mn5c">
                            <Component type={this.state.menuType}/>
                        </div>
                    </div>
                    <div className="g-sd52">
                        <button className="ant-btn ant-btn-primary">保存</button>
                    </div>
                </div>
            </div>
        )
    }
})