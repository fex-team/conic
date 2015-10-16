var React = require('react')
var DragTarget = require('./drag-target')
var DragSource = require('../toolbar/top/component/drag-source')
var Edit = require('./edit')
require('./index.scss')

module.exports = React.createClass({
    getInitialState: function () {
        return {}
    },

    render: function () {
        return (
            <div>
                <DragTarget>
                    <div className="container">
                        <DragTarget>
                            <DragSource>
                                <Edit>123</Edit>
                            </DragSource>
                        </DragTarget>
                        <DragTarget>123</DragTarget>
                        <DragTarget>123</DragTarget>
                        <DragTarget>123</DragTarget>
                    </div>
                </DragTarget>
            </div>
        )
    }
});