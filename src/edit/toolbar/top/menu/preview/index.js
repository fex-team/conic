const React = require('react')
const getTree = require('../../../../phone-edit/get-tree')
const historyStore = require('../../../../stores/history-store')
const editAction = require('../../../../actions/edit-action')

module.exports = React.createClass({
    getInitialState: function () {
        return {}
    },

    initPreview: function () {
        let info = {}
        getTree(historyStore.getContainerEdit(), info)
        editAction.changeShowMode('preview', info)
    },

    render: function () {
        return (
            <div onClick={this.initPreview}
                 className="operate-btn">
                预览
            </div>
        )
    }
})