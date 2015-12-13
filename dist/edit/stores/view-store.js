let dispatcher = require('../dispatcher');
let EventEmitter = require('events').EventEmitter;
let assign = require('object-assign');

const CHANGE_VIEW_NAME = 'viewName';
const CLOSE_VIEW = 'closeView';

let viewName = '';

var ViewStore = assign({}, EventEmitter.prototype, {
    emitChangeView: function () {
        this.emit(CHANGE_VIEW_NAME);
    },

    addchangeViewListener: function (callback) {
        this.on(CHANGE_VIEW_NAME, callback);
    },

    removechangeViewListener: function (callback) {
        this.removeListener(CHANGE_VIEW_NAME, callback);
    },

    getViewName: function () {
        return viewName;
    },

    // 关闭视图
    emitCloseView: function () {
        this.emit(CLOSE_VIEW);
    },

    addCloseViewListener: function (callback) {
        this.on(CLOSE_VIEW, callback);
    },

    removeCloseViewListener: function (callback) {
        this.removeListener(CLOSE_VIEW, callback);
    }
});

ViewStore.dispatchToken = dispatcher.register(function (action) {
    // 选择编辑组件
    switch (action.type) {
        case 'openView':
            viewName = action.viewName;
            ViewStore.emitChangeView();
            break;
        case 'closeView':
            ViewStore.emitCloseView();
            break;
    }
});

module.exports = ViewStore;