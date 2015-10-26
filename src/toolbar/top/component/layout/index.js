var React = require('react')
var DragSource = require('../drag-source')
var DragSourceAbsolute = require('../drag-source-absolute')
var Component = require('../component')

module.exports = React.createClass({
    getInitialState: function () {
        return {}
    },

    render: function () {
        return (
            <div>
                <div className="container">
                    <DragSource type="LayoutBox">
                        <Component icon="square-o">万能矩形</Component>
                    </DragSource>
                    <DragSourceAbsolute type="LayoutBox">
                        <Component icon="square">绝对矩形</Component>
                    </DragSourceAbsolute>
                </div>
            </div>
        )
    }
})