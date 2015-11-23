/**
 * @author dongtiancheng
 * @date 15/11/5.
 * @email dongtiancheng@baidu.com
 */
let dispatcher = require('../dispatcher')
let EventEmitter = require('events').EventEmitter
let assign = require('object-assign')
let editStore = require('./edit-store')

let CHANGE_EVENT = 'change'
let ADD_CHILD = 'add'

let currentTreeNode = null
let previousTreeNode = null

let _ = require('lodash')

let getTree = require('../toolbar/right/tree/get-tree')

function expandParent(treeNode) {
    treeNode.expand()

    if (treeNode.props.parent) {
        expandParent(treeNode.props.parent)
    }
}

let TreeNodeStore = assign({}, EventEmitter.prototype, {
    emitChange: function (e) {
        this.emit(CHANGE_EVENT, e)
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback)
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback)
    },

    emitAddChild: function (item, component, childInfo) {
        this.emit(ADD_CHILD, item, component, childInfo)
    },

    addAddListener: function (callback) {
        this.on(ADD_CHILD, callback)
    },

    removeAddListener: function (callback) {
        this.removeListener(ADD_CHILD, callback)
    },

    get: function () {
        return currentTreeNode
    }
})

TreeNodeStore.dispatchToken = dispatcher.register((action) => {

    switch (action.type) {
        case 'selectTreeNode':
            if (action.component === currentTreeNode) {
                return
            }

            previousTreeNode = currentTreeNode
            currentTreeNode = action.component

            if (previousTreeNode) {
                previousTreeNode.unSelected()
            }

            expandParent(currentTreeNode)

            TreeNodeStore.emitChange(currentTreeNode)
            break

        case 'addTreeNode':
            var item = action.item
            var component = action.component
            var childInfo = _.cloneDeep(action.childInfo)

            // 删除被拽出元素的树节点
            if (item.edit) {
                item.edit.treeNode.removeSelf();
            }

            var uniqueKey = childInfo.uniqueKey

            var dragedEdit = _.find(component.childInstance.childEdits, function (edit) {
                return edit.props.uniqueKey === uniqueKey
            })

            childInfo.component = dragedEdit

            getTree(dragedEdit, childInfo, 0)

            component.treeNode.addChild(childInfo)

            TreeNodeStore.emitAddChild(action.component, action.item, childInfo)
            break
    }
})

module.exports = TreeNodeStore
