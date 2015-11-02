var React = require('react')
require('./index.scss')

module.exports = React.createClass({
    getInitialState: function () {
        return {}
    },

    render: function () {
        return (
            <div>
                <div className="operate-button-layout">
                    <button className="ant-btn ant-btn-primary">保存</button>
                </div>
            </div>
        )
    }
})