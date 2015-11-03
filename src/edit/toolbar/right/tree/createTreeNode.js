/**
 * @author dongtiancheng
 * @date 15/11/2.
 * @email dongtiancheng@baidu.com
 */

var Tree = require('antd/lib/tree')
var TreeNode = Tree.TreeNode

module.exports = (function () {
    var treePropsCache = [];

    return function getTreeNode(editComponent) {

        let editProps = editComponent.props;
        let editChildrenProps = editProps.children.props;

        let treeProps = {
            title: editChildrenProps.name,
            component: editComponent
        }

        treePropsCache.push(treeProps)

        return treeProps
    }
})();