var dispatcher = require('../dispatcher')

module.exports = {
    addHistory: function (operate) {
        dispatcher.dispatch({
            type: 'addHistory',
            operate: operate
        })
    },
    setContainerEdit: function (edit) {
        dispatcher.dispatch({
            type: 'setContainerEdit',
            edit: edit
        })
    },
    revertHistory: function (start, end) {
        dispatcher.dispatch({
            type: 'revertHistory',
            start: start,
            end: end
        })
    }
}