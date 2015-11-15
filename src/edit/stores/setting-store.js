let dispatcher = require('../dispatcher')
let EventEmitter = require('events').EventEmitter
let assign = require('object-assign')

let CHANGE_VIEW_TYPE = 'viewType'

let setting = {}
let tree = {}

var SettingStore = assign({}, EventEmitter.prototype, {
    emitViewType: function () {
        this.emit(CHANGE_VIEW_TYPE)
    },

    addViewTypeListener: function (callback) {
        this.on(CHANGE_VIEW_TYPE, callback)
    },

    removeViewTypeListener: function (callback) {
        this.removeListener(CHANGE_VIEW_TYPE, callback)
    },

    getViewType: function () {
        return setting.viewType
    },

    getTree: function () {
        return tree
    }
})

SettingStore.dispatchToken = dispatcher.register(function (action) {
    // 选择编辑组件
    switch (action.type) {
    case 'setDefault':
        setting = action.setting
        tree = action.tree
        break

    case 'changeViewType':
        setting.viewType = action.viewType
        SettingStore.emitViewType()
        break
    }
})

module.exports = SettingStore