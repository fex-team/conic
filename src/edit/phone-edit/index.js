const React = require('react')
const Edit = require('./edit')
const Container = require('../components/container')
const DragContainer = require('./drag-container')
const DragAround = require('./drag-around')
const historyAction = require('../actions/history-action')
const editStore = require('../stores/edit-store')
require('./index.scss')

var defaultJson = require('./default.json')

var PhoneEdit = React.createClass({
    ref: function (ref) {
        historyAction.setContainerEdit(ref)
    },

    componentDidMount: function () {
        editStore.addChangeShowModeListener(this.changeMode)
    },

    componentWillUnmount: function () {
        editStore.removeChangeShowModeListener(this.changeMode)
    },

    changeMode: function () {
        if (editStore.getShowMode() === 'preview') {
            console.log(editStore.getShowModeInfo())
        }
    },

    render: function () {
        return (
            <div>
                <DragContainer>
                    <DragAround>
                        <Edit {...defaultJson} dragTarget="true"
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