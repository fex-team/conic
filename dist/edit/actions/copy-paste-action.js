const dispatcher = require('../dispatcher');

module.exports = {
    copy: function () {
        dispatcher.dispatch({
            type: 'copy'
        });
    },

    paste: function () {
        dispatcher.dispatch({
            type: 'paste'
        });
    }
};