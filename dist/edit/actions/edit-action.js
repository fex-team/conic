var dispatcher = require('../dispatcher');

module.exports = {
    selectComponent: function (component) {
        dispatcher.dispatch({
            type: 'selectComponent',
            component: component
        });
    },

    freshComponent: function (component) {
        dispatcher.dispatch({
            type: 'freshComponent',
            component: component
        });
    },

    updateComponent: function (opts, historyInfo) {
        dispatcher.dispatch({
            type: 'updateComponent',
            opts: opts,
            historyInfo: historyInfo
        });
    },

    removeCurrent: function () {
        dispatcher.dispatch({
            type: 'removeCurrent'
        });
    },

    selectContainer: function () {
        dispatcher.dispatch({
            type: 'selectContainer'
        });
    },

    setContainer: function (edit) {
        dispatcher.dispatch({
            type: 'setContainer',
            edit: edit
        });
    },

    // 修改组件位置
    changePosition: function (position) {
        dispatcher.dispatch({
            type: 'changePosition',
            position: position
        });
    },

    // 修改显示模式
    changeShowMode: function (mode, info) {
        dispatcher.dispatch({
            type: 'changeShowMode',
            mode: mode,
            info: info
        });
    },

    // hover
    hoverComponent: function (component, $dom) {
        dispatcher.dispatch({
            type: 'hoverComponent',
            component: component,
            $dom: $dom
        });
    },

    // 更新样式
    afterUpdateComponent: function () {
        dispatcher.dispatch({
            type: 'afterUpdateComponent'
        });
    },

    // 当前拖拽状态hover组件
    setDragHoverComponent: function (component) {
        dispatcher.dispatch({
            type: 'setDragHoverComponent',
            component: component
        });
    },

    startDropComponent: function (component) {
        dispatcher.dispatch({
            type: 'startDropComponent',
            component: component
        });
    },

    finishDropComponent: function (containerComponent) {
        dispatcher.dispatch({
            type: 'finishDropComponent',
            containerComponent: containerComponent
        });
    },

    startDragAbsoluteComponent: function (component) {
        dispatcher.dispatch({
            type: 'startDragAbsoluteComponent',
            component: component
        });
    },

    endDragAbsoluteComponent: function (component) {
        dispatcher.dispatch({
            type: 'endDragAbsoluteComponent',
            component: component
        });
    },

    updateSelector: function () {
        dispatcher.dispatch({
            type: 'updateSelector'
        });
    }
};