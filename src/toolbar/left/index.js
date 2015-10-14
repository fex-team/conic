var React = require('react')
require('./index.scss')

module.exports = React.createClass({
    render: function () {
        return (
            <div>
                <div className="nothing">
                    <div className="bold">编辑组件</div>

                    <div>请选中一个组件</div>
                </div>
            </div>
        )
    }
})