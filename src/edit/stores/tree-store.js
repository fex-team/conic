/**
 * @author dongtiancheng
 * @date 15/10/31.
 * @email dongtiancheng@baidu.com
 */
let dispatcher = require('../dispatcher')
let EventEmitter = require('events').EventEmitter
let _ = require('lodash')

let CHANGE_EVENT = 'change'
let EDIT_MOUNT_EVENT = 'mount'

let TreeStore = _.extend({}, EventEmitter.prototype, {
    emitChange: function () {
        this.emit(CHANGE_EVENT)
    },

    emitMount: function (component) {
        this.emit(EDIT_MOUNT_EVENT, component)
    },

    addMountListener: function (callback) {
        this.on(EDIT_MOUNT_EVENT, callback)
    },

    removeMountListener: function (callback) {
        this.removeListener(EDIT_MOUNT_EVENT, callback)
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback)
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback)
    },

    get: function () {

    }
})

TreeStore.dispatchToken = dispatcher.register(function (action) {
    switch (action.type) {
        case 'editComponentMounted':
            let component = action.component
            TreeStore.emitMount(component)
            break;
    }
})

module.exports = TreeStore