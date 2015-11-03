var React = require('react')
var DragSource = require('../drag-source')
var DragSourceAbsolute = require('../drag-source-absolute')
var Component = require('../component')
var iconMap = require('../icon-map')

module.exports = React.createClass({
    getInitialState: function () {
        return {}
    },

    render: function () {
        return (
            <div>
                <div className="container">
                    <DragSource type="LayoutBox">
                        <Component icon={iconMap.LayoutBox}>万能矩形</Component>
                    </DragSource>
                    <DragSourceAbsolute type="LayoutBoxAbsolute">
                        <Component icon={iconMap.LayoutBoxAbsolute}>自由矩形</Component>
                    </DragSourceAbsolute>
                </div>
            </div>
        )
    }
})