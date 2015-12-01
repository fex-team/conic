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

    hoverItem: function (component) {
        dispatcher.dispatch({
            type: 'hoverTreeNode',
            component: component
        })
    },

    addTreeNode: function (component, item, childInfo) {
        dispatcher.dispatch({
            type: 'addTreeNode',
            component: component,
            item: item,
            childInfo: childInfo
        })
    },

    removeSelf: function (component) {
        dispatcher.dispatch({
            type: 'removeSelf',
            component: component
        })
    },

    expandAll: function () {
        dispatcher.dispatch({
            type: 'expandAll'
        })
    }
}
