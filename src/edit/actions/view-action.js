var dispatcher = require('../dispatcher')

module.exports = {
    openView: function (viewName) {
        dispatcher.dispatch({
            type: 'openView',
            viewName: viewName
        })
    },

    closeView: function () {
        dispatcher.dispatch({
            type: 'closeView'
        })
    }
}