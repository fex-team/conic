var dispatcher = require('../dispatcher')

module.exports = {
    setDefault: function (setting, tree) {
        dispatcher.dispatch({
            type: 'setDefault',
            setting: setting,
            tree: tree
        })
    },

    changeViewType: function (viewType) {
        dispatcher.dispatch({
            type: 'changeViewType',
            viewType: viewType
        })
    }
}