var React = require('react')
var DragSource = require('../drag-source')

module.exports = React.createClass({
    getInitialState: function () {
        return {}
    },

    render: function () {
        return (
            <div>
                <div className="container">
                    <DragSource icon="square-o"
                                type="layout-square">
                        万能矩形
                    </DragSource>
                </div>
            </div>
        )
    }
})