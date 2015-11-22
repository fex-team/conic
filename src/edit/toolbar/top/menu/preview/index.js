const React = require('react')
const getTree = require('../../../../phone-edit/lib/get-tree')
const historyStore = require('../../../../stores/history-store')
const editAction = require('../../../../actions/edit-action')
const viewAction = require('../../../../actions/view-action')

module.exports = React.createClass({
    getInitialState: function () {
        return {}
    },

    initPreview: function () {
        let info = {
            name: "Container"
        }
        getTree(historyStore.getContainerEdit(), info)
        editAction.changeShowMode('preview', info)
        viewAction.closeView()
        console.log(JSON.stringify(info))
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