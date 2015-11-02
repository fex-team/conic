/**
 * @author dongtiancheng
 * @date 15/10/31.
 * @email dongtiancheng@baidu.com
 */
let dispatcher = require('../dispatcher')
let EventEmitter = require('events').EventEmitter
let _ = require('lodash')

let CHANGE_EVENT = 'change'

let TreeStore = _.extend({}, EventEmitter.prototype, {
    emitChange: function () {
        this.emit(CHANGE_EVENT)
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback)
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback)
    }
})

TreeStore.dispatchToken = dispatcher.register(function (action) {
    switch (action.type) {

    }
})

module.exports = TreeStore