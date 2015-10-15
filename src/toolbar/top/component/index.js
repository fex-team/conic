var React = require('react')
var Layout = require('./layout')
require('./index.scss')

module.exports = React.createClass({
    getInitialState: function () {
        return {}
    },

    render: function () {
        let component
        switch (this.props.type) {
        case 'layout':
            component = (
                <Layout/>
            )
            break;
        }

        return (
            <div>
                <div className="container">
                    {component}
                </div>
            </div>
        )
    }
})