/**
 * @author dongtiancheng
 * @date 15/11/5.
 * @email dongtiancheng@baidu.com
 */
var dispatcher = require('../dispatcher')

module.exports = {
    selectItem: function (component) {
        dispatcher.dispatch({
            type: 'selectTreeNode',
            component: component
        })
    },

    triggerComponent: function (component) {
        dispatcher.dispatch({
            type: 'triggerComponent',
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
