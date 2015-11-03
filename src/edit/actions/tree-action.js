/**
 * @author dongtiancheng
 * @date 15/10/31.
 * @email dongtiancheng@baidu.com
 */
var dispatcher = require('../dispatcher')

module.exports = {
    selectItem: function (component) {
        dispatcher.dispatch({
            type: 'selectItem',
            component: component
        })
    },

    editComponentMounted: function (component) {
        dispatcher.dispatch({
            type: 'editComponentMounted',
            component: component
        })
    }
}

