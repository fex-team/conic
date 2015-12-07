const React = require('react')
const Edit = require('./edit')
const Container = require('../components/container')
const DragContainer = require('./drag-container')
const DragAround = require('./drag-around')
const historyAction = require('../actions/history-action')
const editAction = require('../actions/edit-action')
const editStore = require('../stores/edit-store')
const settingStore = require('../stores/setting-store')
const copyPasteAction = require('../actions/copy-paste-action')
const $ = require('jquery')
require('./index.scss')

const Hover = require('./hover')

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
        editAction.setContainer(ref)
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
        settingStore.removeViewTypeListener(this.viewTypeChange)
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
        let defaultTreeInfo = this.props.tree

        let editStyle = {
            height: 'inherit',
            display: this.state.mode === 'edit' ? 'flex' : 'none',
            justifyContent: 'center'
        }

        let previewStyle = {
            height: 'inherit',
            display: this.state.mode === 'preview' ? 'flex' : 'none',
            justifyContent: 'center'
        }

        return (
            <div style={{height: 'inherit'}}>
                <div style={editStyle}
                     onMouseLeave={this.onMouseLeave}
                     key={this.props.editKey}>
                    <div style={viewTypeStyle}>
                        <DragContainer>
                            <DragAround>
                                <Edit {...defaultTreeInfo} dragTarget="true"
                                                           ref={this.ref}>
                                    <Container mode="edit"/>
                                </Edit>
                            </DragAround>
                        </DragContainer>
                        <Hover/>
                    </div>
                </div>

                <div style={previewStyle}
                     key={this.props.previewKey}>
                    <div style={viewTypeStyle}>
                        <Container mode="preview" {...editStore.getShowModeInfo()}/>
                    </div>
                </div>
            </div>
        )
    }
})

module.exports = PhoneEdit