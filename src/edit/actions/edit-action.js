var dispatcher = require('../dispatcher')

module.exports = {
    selectComponent: function (component) {
        dispatcher.dispatch({
            type: 'selectComponent',
            component: component
        })
    },

    freshComponent: function (component) {
        dispatcher.dispatch({
            type: 'freshComponent',
            component: component
        })
    },

    updateComponent: function (opts, historyInfo) {
        dispatcher.dispatch({
            type: 'updateComponent',
            opts: opts,
            historyInfo: historyInfo
        })
    },

    removeCurrent: function () {
        dispatcher.dispatch({
            type: 'removeCurrent'
        })
    },

    selectContainer: function () {
        dispatcher.dispatch({
            type: 'selectContainer'
        })
    },

    // 修改组件位置
    changePosition: function (position) {
        dispatcher.dispatch({
            type: 'changePosition',
            position: position
        })
    },

    // 修改显示模式
    changeShowMode: function (mode, info) {
        dispatcher.dispatch({
            type: 'changeShowMode',
            mode: mode,
            info: info
        })
    },

    // 修改显示分辨率类型
    changeViewType: function (viewType) {
        dispatcher.dispatch({
            type: 'changeViewType',
            viewType: viewType
        })
    }
}