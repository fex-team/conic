const ReactDOM = require('react-dom')
const $ = require('jquery')
const dispatcher = require('../dispatcher')
const EventEmitter = require('events').EventEmitter
const assign = require('object-assign')

const CHANGE_EVENT = 'changeComponent'
const CHANGE_SELECT_CONTAINER_EVENT = 'changeSelectContainer'
const CHANGE_LEFT_TAB_EVENT = 'changeLeftTab'
const CHANGE_SHOW_MODE = 'changeShowMode'
const CHANGE_HOVER_DOM = 'changeHoverDom'
const CHANGE_AFTER_UPDATE_COMPONENT = 'changeAfterUpdateComponent'

let currentComponent = null
let $currentComponentDom
let previousComponent = null
let position

let editContainer = null
let $editContainerDom

// 当前hover组件
let hoverComponent
let $hoverDom

let showMode = 'edit'
let showModeInfo = null

// 当前unique计数器
let uniqueKeyIndex = 0

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

    get$dom: function () {
        return $currentComponentDom
    },

    getContainer: function () {
        return editContainer
    },

    getContainerDom: function () {
        return $editContainerDom
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
    },

    // 获得uniqueKey
    getUniqueKey: function () {
        return uniqueKeyIndex++
    },

    // 修改hover dom
    emitChangeHoverDom: function () {
        this.emit(CHANGE_HOVER_DOM)
    },

    addChangeHoverDomListener: function (callback) {
        this.on(CHANGE_HOVER_DOM, callback)
    },

    removeChangeHoverDomListener: function (callback) {
        this.removeListener(CHANGE_HOVER_DOM, callback)
    },

    getHoverComponent: function () {
        return hoverComponent
    },

    get$hoverDom: function () {
        return $hoverDom
    },

    // 组件更新之后
    emitAfterUpdateComponent: function () {
        this.emit(CHANGE_AFTER_UPDATE_COMPONENT)
    },

    addAfterUpdateComponentListener: function (callback) {
        this.on(CHANGE_AFTER_UPDATE_COMPONENT, callback)
    },

    removeAfterUpdateComponentListener: function (callback) {
        this.removeListener(CHANGE_AFTER_UPDATE_COMPONENT, callback)
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
        $currentComponentDom = $(ReactDOM.findDOMNode(currentComponent))

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
        currentComponent.updateSelf(action.opts, action.historyInfo)
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
    case 'hoverComponent':
        hoverComponent = action.component
        $hoverDom = action.$dom
        EditStore.emitChangeHoverDom()
        break
    case 'afterUpdateComponent':
        EditStore.emitAfterUpdateComponent()
        break
    case 'setContainer':
        editContainer = action.edit
        $editContainerDom = $(ReactDOM.findDOMNode(editContainer))
        break
    }
})

module.exports = EditStore