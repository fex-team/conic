var dispatcher = require('../dispatcher')

module.exports = {
    selectComponent: function (component) {
        dispatcher.dispatch({
            type: 'selectComponent',
            component: component
        })
    }
}