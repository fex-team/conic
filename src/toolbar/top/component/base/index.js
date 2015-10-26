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
                    <DragSource type="BaseText">
                        <Component icon="font">文字</Component>
                    </DragSource>
                </div>
            </div>
        )
    }
})