let dispatcher = require('../dispatcher')
let EventEmitter = require('events').EventEmitter
let assign = require('object-assign')

let CHANGE_EVENT = 'changeComponent'
let CHANGE_SELECT_CONTAINER_EVENT = 'changeSelectContainer'
let CHANGE_LEFT_TAB_EVENT = 'changeLeftTab'
let currentComponent = null
let previousComponent = null
let position

let CHANGE_SHOW_MODE = 'changeShowMode'
let showMode = 'edit'
let showModeInfo = null

var EditStore = assign({}, EventEmitter.prototype, {
    // 选中组件
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
        return currentComponent
    },

    // 选择container
    emitSelectContainer: function () {
        this.emit(CHANGE_SELECT_CONTAINER_EVENT)
    },

    addSelectContainerListener: function (callback) {
        this.on(CHANGE_SELECT_CONTAINER_EVENT, callback)
    },

    removeSelectContainerListener: function (callback) {
        this.removeListener(CHANGE_SELECT_CONTAINER_EVENT, callback)
    },

    // 修改左侧编辑栏tab
    emitLeftTabChange: function (tabName) {
        this.tabName = tabName
        this.emit(CHANGE_LEFT_TAB_EVENT)
    },

    addLeftTabChangeListener: function (callback) {
        this.on(CHANGE_LEFT_TAB_EVENT, callback)
    },

    removeLeftTabChangeListener: function (callback) {
        this.removeListener(CHANGE_LEFT_TAB_EVENT, callback)
    },

    getTabName: function () {
        return this.tabName
    },

    // 修改渲染模式（编辑态、预览态）
    emitChangeShowMode: function () {
        this.emit(CHANGE_SHOW_MODE)
    },

    addChangeShowModeListener: function (callback) {
        this.on(CHANGE_SHOW_MODE, callback)
    },

    removeChangeShowModeListener: function (callback) {
        this.removeListener(CHANGE_SHOW_MODE, callback)
    },

    getShowMode: function () {
        return showMode
    },

    getShowModeInfo: function () {
        return showModeInfo
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

        // 左侧tab选中编辑区
        EditStore.emitLeftTabChange('edit')

        previousComponent = currentComponent
        currentComponent = action.component

        //currentComponent.treeNode.select()

        // 如果上个组件存在，则取消选中状态
        if (previousComponent) {
            previousComponent.unSelected()
        }

        EditStore.emitChange()
        break

    case 'triggerComponent':

        if (action.component === currentComponent) {
            return
        }

        break;

    case 'freshComponent':
        currentComponent = action.component
        EditStore.emitChange()
        break
    case 'updateComponent':
        currentComponent.UpdateChildren(action.opts, action.historyInfo)
        break
    case 'removeCurrent':
        currentComponent.removeSelf(true)
        previousComponent = currentComponent = null
        break
    case 'selectContainer':
        EditStore.emitSelectContainer()
        break
    case 'changeShowMode':
        showMode = action.mode
        showModeInfo = action.info
        EditStore.emitChangeShowMode()
        break
    }
})

module.exports = EditStore