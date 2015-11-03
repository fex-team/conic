var dispatcher = require('../../../../../dispatcher')

module.exports = {
    changeColor: function (color) {
        dispatcher.dispatch({
            type: 'changeColor',
            color: color
        })
    },

    changeBox: function (box) {
        dispatcher.dispatch({
            type: 'changeBox',
            box: box
        })
    }
}