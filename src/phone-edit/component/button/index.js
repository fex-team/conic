var React = require('react')
require('./index.scss')

module.exports = React.createClass({
    render: function () {
        return (
            <div>
                <div className={'btn btn-'+this.props.type}>默认按钮</div>
            </div>
        )
    }
})