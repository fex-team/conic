var React = require('react')

module.exports = React.createClass({
    getInitialState: function () {
        return {}
    },

    onClick: function () {
        console.log(123)
    },

    render: function () {
        return (
            <div>
                <div onClick={this.onClick}>
                    {this.props.children}
                </div>
            </div>
        )
    }
})