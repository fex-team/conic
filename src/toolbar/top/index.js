var React = require('react')
var ComponentTable = require('./component-table')
var Component = require('./component')
var OperateButton = require('./operate-button')
var Menu = require('./menu')
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
                <Menu/>
                <div className="f-cb layout">
                    <div className="g-sd51">
                        <div className="table-response">
                            <ComponentTable onChangeType={this.onChangeMenuType}/>
                        </div>
                    </div>
                    <div className="g-mn5">
                        <div className="g-mn5c">
                            <Component type={this.state.menuType}/>
                        </div>
                    </div>
                    <div className="g-sd52">
                        <OperateButton/>
                    </div>
                </div>
            </div>
        )
    }
})