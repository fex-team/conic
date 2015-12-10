const React = require('react')
const ComponentTable = require('./component-table')
const Components = require('./components')

const EditPanel = React.createClass({
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
            <div className="_namespace">
                <ComponentTable onChangeType={this.onChangeMenuType}/>
                <Components type={this.state.menuType}/>
            </div>
        )
    }
})

module.exports = EditPanel