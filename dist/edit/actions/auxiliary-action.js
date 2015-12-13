var dispatcher = require('../dispatcher');

module.exports = {
    showLayoutBox: function (isShow) {
        dispatcher.dispatch({
            type: 'showLayoutBox',
            isShow: isShow
        });
    }
};