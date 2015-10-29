let dispatcher = require('../dispatcher')
let EventEmitter = require('events').EventEmitter
let assign = require('object-assign')

let CHANGE_EVENT = 'changeComponent'
let CHANGE_SELECT_CONTAINER_EVENT = 'changeSelectContainer'
let currentComponent = null
let previousComponent = null

var EditStore = assign({}, EventEmitter.prototype, {
    emitChange: function () {
        this.emit(CHANGE_EVENT)
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback)
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback)
    },

    emitSelectContainer: function () {
        this.emit(CHANGE_SELECT_CONTAINER_EVENT)
    },

    addSelectContainerListener: function (callback) {
        this.on(CHANGE_SELECT_CONTAINER_EVENT, callback)
    },

    removeSelectContainerListener: function (callback) {
        this.removeListener(CHANGE_SELECT_CONTAINER_EVENT, callback)
    },

    get: function () {
        return currentComponent
    }
})

EditStore.dispatchToken = dispatcher.register(function (action) {
    // 选择编辑组件
    switch (action.type) {
    case 'selectComponent':
        // 如果是同一个组件，不做处理
        if (action.component === currentComponent) {
            return
        }

        previousComponent = currentComponent
        currentComponent = action.component

        // 如果上个组件存在，则取消选中状态
        if (previousComponent) {
            previousComponent.unSelected()
        }

        EditStore.emitChange()
        break
    case 'updateComponent':
        currentComponent.UpdateChildren(action.opts)
        break
    case 'removeCurrent':
        currentComponent.removeSelf()
        previousComponent = currentComponent = null
        break
    case 'selectContainer':
        EditStore.emitSelectContainer()
        break
    }
})

module.exports = EditStore