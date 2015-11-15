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
    getInitialState: function () {
        return {
            mode: 'edit'
        }
    },

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
        this.setState({
            mode: editStore.getShowMode()
        })
    },

    render: function () {
        let editTree
        let defaultTreeInfo = editStore.getShowModeInfo() || defaultJson

        switch (this.state.mode) {
        case 'edit':
            return (
                <DragContainer>
                    <DragAround>
                        <Edit {...defaultTreeInfo} dragTarget="true"
                                                   ref={this.ref}>
                            <Container mode="edit"/>
                        </Edit>
                    </DragAround>
                </DragContainer>
            )
            break
        case 'preview':
            return (
                <Container mode="preview" {...editStore.getShowModeInfo()}/>
            )
            break
        }

        return (
            <div namespace>{editTree}</div>
        )
    }
})

module.exports = PhoneEdit