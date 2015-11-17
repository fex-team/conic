const React = require('react')
const Edit = require('./edit')
const Container = require('../components/container')
const DragContainer = require('./drag-container')
const DragAround = require('./drag-around')
const historyAction = require('../actions/history-action')
const editAction = require('../actions/edit-action')
const editStore = require('../stores/edit-store')
const settingStore = require('../stores/setting-store')
require('./index.scss')

const PhoneSelector = require('./selector')
const PhoneHover = require('./hover')

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

    onMouseLeave: function () {
        // 取消hover
        editAction.hoverComponent(null)
    },

    render: function () {
        let editTree
        let defaultTreeInfo = editStore.getShowModeInfo() || settingStore.getTree()

        switch (this.state.mode) {
        case 'edit':
            return (
                <div onMouseLeave={this.onMouseLeave}>
                    <DragContainer>
                        <DragAround>
                            <Edit {...defaultTreeInfo} dragTarget="true"
                                                       ref={this.ref}>
                                <Container mode="edit"/>
                            </Edit>
                        </DragAround>
                    </DragContainer>
                    <PhoneSelector/>
                    <PhoneHover/>
                </div>
            )
            break
        case 'preview':
            return (
                <Container mode="preview" {...editStore.getShowModeInfo()}/>
            )
            break
        }

        return (
            <div style={{position:'relative'}}
                 namespace>{editTree}</div>
        )
    }
})

module.exports = PhoneEdit