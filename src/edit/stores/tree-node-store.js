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
let SELECT_EVENT = 'select'


let currentTreeNode = null
let previousTreeNode = null

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

    get: function () {
        return currentTreeNode
    },

    emitSelect: function () {
        this.emit(SELECT_EVENT)
    },

    addSelectListener: function (callback) {
        this.on(SELECT_EVENT, callback)
    },

    removeSelectListener: function (callback) {
        this.removeListener(SELECT_EVENT, callback)
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

        case 'expandAll':

        }
})

module.exports = TreeNodeStore
