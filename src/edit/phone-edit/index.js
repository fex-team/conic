var React = require('react')
var Edit = require('./edit')
var Container = require('../components/container')
var DragContainer = require('./drag-container')
var DragAround = require('./drag-around')
var historyAction = require('../actions/history-action')
require('./index.scss')

var defaultJson = require('./default.json')

var PhoneEdit = React.createClass({
    getInitialState: function () {
        return {
            defaultTree: {}
        }
    },

    componentWillMount: function () {
        this.setState({
            defaultTree: defaultJson
        })
    },

    ref: function (ref) {
        historyAction.setContainerEdit(ref)
    },

    render: function () {
        return (
            <div>
                <DragContainer>
                    <DragAround>
                        <Edit {...this.state.defaultTree} dragTarget="true"
                                                          ref={this.ref}>
                            <Container/>
                        </Edit>
                    </DragAround>
                </DragContainer>
            </div>
        )
    }
})

module.exports = PhoneEdit