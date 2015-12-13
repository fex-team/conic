const dispatcher = require('../dispatcher');
const EventEmitter = require('events').EventEmitter;
const assign = require('object-assign');
const editAction = require('../actions/edit-action');

const CHANGE_VIEW_TYPE = 'viewType';
const CHANGE_TREE = 'changeTree';

let setting = {};
let tree = {};

var SettingStore = assign({}, EventEmitter.prototype, {
    emitViewType: function () {
        this.emit(CHANGE_VIEW_TYPE);
    },

    addViewTypeListener: function (callback) {
        this.on(CHANGE_VIEW_TYPE, callback);
    },

    removeViewTypeListener: function (callback) {
        this.removeListener(CHANGE_VIEW_TYPE, callback);
    },

    getViewType: function () {
        return setting.viewType;
    },

    getTree: function () {
        return tree;
    },

    // 修改tree内容
    emitChangeTree: function () {
        this.emit(CHANGE_TREE);
    },

    addChangeTreeListener: function (callback) {
        this.on(CHANGE_TREE, callback);
    },

    removeChangeTreeListener: function (callback) {
        this.removeListener(CHANGE_TREE, callback);
    }
});

SettingStore.dispatchToken = dispatcher.register(function (action) {
    // 选择编辑组件
    switch (action.type) {
        case 'setDefault':
            setting = action.setting;
            tree = action.tree;
            break;

        case 'changeViewType':
            setting.viewType = action.viewType;
            SettingStore.emitViewType();

            // 完毕后，更新selector样式
            setTimeout(() => {
                editAction.updateSelector();
            });
            break;

        case 'changeTree':
            tree = action.tree;
            SettingStore.emitChangeTree();
            break;
    }
});

module.exports = SettingStore;