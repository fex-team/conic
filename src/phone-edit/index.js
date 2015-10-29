var React = require('react')
var Edit = require('./edit')
var Container = require('../components/container')
var DragContainer = require('./drag-container')
var DragAround = require('./drag-around')
require('./index.scss')

var defaultJson = require('./default.json')

var PhoneEdit = React.createClass({
    getInitialState: function () {
        return {}
    },

    render: function () {
        return (
            <div>
                <DragContainer>
                    <DragAround>
                        <Edit {...defaultJson} dragTarget="true">
                            <Container/>
                        </Edit>
                    </DragAround>
                </DragContainer>
            </div>
        )
    }
})

module.exports = PhoneEdit