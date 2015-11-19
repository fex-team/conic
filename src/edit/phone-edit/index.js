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

const viewTypeStyle = {
    height: 'inherit',
    position: 'relative'
}

function handleViewTypeChange() {
    switch (settingStore.getViewType()) {
    case 'pc':
        viewTypeStyle.width = null
        viewTypeStyle.flexGrow = 1
        break
    case 'mobile':
        viewTypeStyle.width = 500
        viewTypeStyle.flexGrow = null
        break
    }
}

var PhoneEdit = React.createClass({
    getInitialState: function () {
        return {
            mode: 'edit'
        }
    },

    ref: function (ref) {
        historyAction.setContainerEdit(ref)
    },

    componentWillMount(){
        handleViewTypeChange()
    },

    componentDidMount: function () {
        editStore.addChangeShowModeListener(this.changeMode)
        settingStore.addViewTypeListener(this.viewTypeChange)
    },

    componentWillUnmount: function () {
        editStore.removeChangeShowModeListener(this.changeMode)
        editStore.addSelectContainerListener(this.onSelectContainer)
    },

    viewTypeChange: function () {
        handleViewTypeChange()
        this.forceUpdate()
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
        let defaultTreeInfo = editStore.getShowModeInfo() || settingStore.getTree()

        switch (this.state.mode) {
        case 'edit':
            return (
                <div style={{height:'inherit',display:'flex',justifyContent:'center'}}
                     onMouseLeave={this.onMouseLeave}>
                    <div style={viewTypeStyle}>
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
                </div>
            )
            break
        case 'preview':
            return (
                <div style={{height:'inherit',display:'flex',justifyContent:'center'}}>
                    <div style={viewTypeStyle}>
                        <Container mode="preview" {...editStore.getShowModeInfo()}/>
                    </div>
                </div>
            )
            break
        }
    }
})

module.exports = PhoneEdit