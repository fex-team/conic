var React = require('react')
var DragSource = require('../drag-source')
var Component = require('../component')
var iconMap = require('../icon-map')

module.exports = React.createClass({
    getInitialState: function () {
        return {}
    },

    render: function () {
        return (
            <div _namespace>
                <div className="container">
                    <DragSource type="BaseText">
                        <Component icon={iconMap.BaseText}>文字</Component>
                    </DragSource>
                </div>
            </div>
        )
    }
})