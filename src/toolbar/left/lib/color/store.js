let dispatcher = require('../../../../dispatcher')
let EventEmitter = require('events').EventEmitter
let assign = require('object-assign')

let CHANGE_COLOR_EVENT = 'changeColor'
let CHANGE_SHOW_EVENT = 'changeShow'

let currentBox = null
let currentColor = null

var ColorStore = assign({}, EventEmitter.prototype, {
    // 改变颜色
    emitChangeColor: function () {
        this.emit(CHANGE_COLOR_EVENT)
    },

    addChangeColorListener: function (callback) {
        this.on(CHANGE_COLOR_EVENT, callback)
    },

    removeChangeColorListener: function (callback) {
        this.removeListener(CHANGE_COLOR_EVENT, callback)
    },

    // trigger显示colorPicker
    emitChangeShow: function () {
        this.emit(CHANGE_SHOW_EVENT)
    },

    addChangeShowListener: function (callback) {
        this.on(CHANGE_SHOW_EVENT, callback)
    },

    removeChangeShowListener: function (callback) {
        this.removeListener(CHANGE_SHOW_EVENT, callback)
    },

    getColor: function () {
        return currentColor
    },

    getBox: function () {
        return currentBox
    }
})

ColorStore.dispatchToken = dispatcher.register(function (action) {
    // 选择编辑组件
    switch (action.type) {
    case 'changeColor':
        currentColor = action.color
        ColorStore.emitChangeColor()
        break
    case 'changeBox':
        currentBox = action.box
        break
    }
})

module.exports = ColorStore