var React = require('react')
var DragTarget = require('./drag-target')
var DragSource = require('../toolbar/top/component/drag-source')
var Edit = require('./edit')
var Container = require('../components/container')
require('./index.scss')

var defaultJson = require('./default.json')

var Root = React.createClass({
    getInitialState: function () {
        return {}
    },

    render: function () {
        return (
            <div>
                <Edit childs={defaultJson}
                      dragTarget="true">
                    <Container/>
                </Edit>
            </div>
        )
    }
})

module.exports = Root