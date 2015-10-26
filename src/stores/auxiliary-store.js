let dispatcher = require('../dispatcher')
let EventEmitter = require('events').EventEmitter
let assign = require('object-assign')

let CHANGE_EVENT = 'change'

let auxiliaryStoreInfo = {}

var AuxiliaryStore = assign({}, EventEmitter.prototype, {
    emitChange: function () {
        this.emit(CHANGE_EVENT)
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback)
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback)
    },

    get: function () {
        return auxiliaryStoreInfo
    }
})

AuxiliaryStore.dispatchToken = dispatcher.register(function (action) {
    // 选择编辑组件
    switch (action.type) {
    case 'showLayoutBox':
        auxiliaryStoreInfo.showLayoutBox = action.isShow
        AuxiliaryStore.emitChange()
        break
    }
})

module.exports = AuxiliaryStore