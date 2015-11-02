var dispatcher = require('../dispatcher')

module.exports = {
    selectComponent: function (component) {
        dispatcher.dispatch({
            type: 'selectComponent',
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
    }
}