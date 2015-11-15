var dispatcher = require('../dispatcher')

module.exports = {
    setDefaultSetting: function (setting) {
        dispatcher.dispatch({
            type: 'setDefaultSetting',
            setting: setting
        })
    },

    changeViewType: function (viewType) {
        dispatcher.dispatch({
            type: 'changeViewType',
            viewType: viewType
        })
    }
}