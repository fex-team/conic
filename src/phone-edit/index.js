var React = require('react')
var DustBin = require('./dustbin')
require('./index.scss')

module.exports = React.createClass({
    getInitialState: function () {
        return {}
    },

    render: function () {
        return (
            <div>
                <DustBin/>
            </div>
        )
    }
})