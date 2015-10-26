var React = require('react')

module.exports = React.createClass({
    getInitialState: function () {
        return {}
    },

    render: function () {
        return (
            <div>
                <div className="drag-source menu-component">
                    <i className={'fa fa-'+this.props.icon}></i>
                    <span>{this.props.children}</span>
                </div>
            </div>
        )
    }
})
