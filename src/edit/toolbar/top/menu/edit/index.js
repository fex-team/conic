const React = require('react')
const getTree = require('../../../../phone-edit/lib/get-tree')
const historyStore = require('../../../../stores/history-store')
const editAction = require('../../../../actions/edit-action')
const editStore = require('../../../../stores/edit-store')

module.exports = React.createClass({
    getInitialState: function () {
        return {}
    },

    backToEdit: function () {
        editAction.changeShowMode('edit', editStore.getShowModeInfo())
    },

    render: function () {
        return (
            <div onClick={this.backToEdit}
                 className="operate-btn">
                <i className="fa fa-reply"
                   style={{marginRight:5}}></i>返回编辑
            </div>
        )
    }
})