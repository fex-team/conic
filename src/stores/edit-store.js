var dispatcher = require('../dispatcher')

dispatcher.register(function(action) {
    console.log(action)
    if (action.type === 'selectComponent') {
        console.log(213)
    }
})