let dispatcher = require('../dispatcher');
let EventEmitter = require('events').EventEmitter;
let assign = require('object-assign');

let CHANGE_EVENT = 'change';

let footerOpts = {
    instanceNumber: 0
};

var FooterStore = assign({}, EventEmitter.prototype, {
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    get: function () {
        return footerOpts;
    }
});

FooterStore.dispatchToken = dispatcher.register(function (action) {
    // 选择编辑组件
    switch (action.type) {
        case 'increaseInstanceNumber':
            footerOpts.instanceNumber = footerOpts.instanceNumber + 1;
            FooterStore.emitChange();
            break;
        case 'reduceInstanceNumber':
            footerOpts.instanceNumber = footerOpts.instanceNumber - 1;
            FooterStore.emitChange();
            break;
    }
});

module.exports = FooterStore;