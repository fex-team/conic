const React = require('react')

module.exports = React.createClass({
    getInitialState: function () {
        return {}
    },

    render: function () {
        return (
            <div className="add-script-layout">
                <div className="ant-btn add-script-btn">
                    <i className="fa fa-plus-circle"
                       style={{marginRight:5}}></i>添新加脚本
                </div>
            </div>
        )
    }
})