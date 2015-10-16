var React = require('react')
var DragSource = require('../drag-source')
var Component = require('../component')

module.exports = React.createClass({
    getInitialState: function () {
        return {}
    },

    render: function () {
        return (
            <div>
                <div className="container">
                    <DragSource type="layout-square">
                        <Component icon="square-o">万能矩形</Component>
                    </DragSource>
                </div>
            </div>
        )
    }
})