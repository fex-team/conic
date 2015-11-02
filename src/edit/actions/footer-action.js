var dispatcher = require('../dispatcher')

module.exports = {
    increaseInstanceNumber: function () {
        dispatcher.dispatch({
            type: 'increaseInstanceNumber'
        })
    },
    reduceInstanceNumber: function () {
        dispatcher.dispatch({
            type: 'reduceInstanceNumber'
        })
    }
}