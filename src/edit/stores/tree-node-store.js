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

    emitAddChild: function (e) {
        this.emit(ADD_CHILD, e)
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

            TreeNodeStore.emitChange(currentTreeNode)
            break

        case 'addTreeNode':
            var item = action.item
            var component = action.component
            var childInfo = action.childInfo

            console.log(item, component, childInfo)
            // 删除被拽出元素的树节点
            item.edit.treeNode.removeSelf();

            var uniqueKey = childInfo.uniqueKey

            var dragedEdit = _.find(component.childInstance.childEdits, function (edit) {
                return edit.props.uniqueKey === uniqueKey
            })

            childInfo.component = dragedEdit

            component.treeNode.addChild(childInfo)

            TreeNodeStore.emitAddChild(action.component, action.item, action.childInfo)
            //var childComponent = component.childInstance.childEdits[childInfo.index]
            //
            //// 新拖拽的节点
            //if (item.edit) {
            //    var oldTreeNode = item.edit.treeNode
            //
            //    oldTreeNode.removeSelf()
            //}
            //
            //childInfo.component = childComponent
            //
            //component.treeNode.addChild(childInfo)
            //
            //TreeNodeStore.emitAddChild(action.component, action.item, action.childInfo)
            break

        case 'removeSelf':
            var component = action.component

            console.log(component)


            break
    }
})

module.exports = TreeNodeStore
