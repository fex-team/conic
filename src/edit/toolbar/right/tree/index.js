var React = require('react')
var EnterAnimation = require('antd/lib/enter-animation')
var Tree = require('antd/lib/tree')
var TreeNode = Tree.TreeNode
var editStore = require('../../../stores/edit-store')
var treeStore = require('../../../stores/tree-store')
var _ = require('lodash');
var getTree = require('../../../phone-edit/get-tree')
var defaultJson = require('../../../phone-edit/default.json')
require('./index.scss');

const animation = {
    enter: {
        type: 'right'
    }
};

var treeNodes = {}
var branches = {}
var cooked

let ComponentTree = React.createClass({
    getInitialState: function () {
        return {
            rootNode: <TreeNode></TreeNode>,
            treeNodes: {}
        }
    },

    onSelect: function (e) {
        var node = e.node
        var component = node.props.component
        component.clickAction()
    },

    onComponentChange: function () {
        var component = editStore.get()
        var uniqueKey = component.props.uniqueKey
        var treeNode = treeNodes[uniqueKey]
        console.log(treeNode)
    },

    onEditMounted: function (component) {
        if (component.props.name === 'Container') {
            var info = {}
            getTree(component, info)
            info['name'] = 'Container'
            var treeNodes = this.state.treeNodes
            var rootNode = this.getChild(info, treeNodes)
            this.setState({
                rootNode: rootNode
            })
        }

        //if (component.props.childs.length === 0) {
        //
        //    // 叶子
        //    cooked = <TreeNode {...treeProps}></TreeNode>
        //}
        //else if (component.props.childs.length === 1
        //    && component.props.parent.childs.length === 1
        //    && component === cooked.props.component.props.parent){
        //
        //    // 单子节点节点结构
        //    cooked = <TreeNode {...treeProps}>{cooked}</TreeNode>
        //}
        //else if (component.props.childs.length === 1
        //    && component.props.parent.childs.length > 1
        //    && component === cooked.props.component.props.parent) {
        //
        //    // 一个树的 root
        //    let branch = <TreeNode {...treeProps}>{cooked}</TreeNode>
        //    if (!branches[component.props.parent]) {
        //        branches[component.props.parent] = [branch]
        //    }
        //    else {
        //        branches[component.props.parent].push(branch)
        //    }
        //
        //    cooked = branch
        //}
        //else if (component.props.childs.length > 1 && component in branches) {
        //
        //    // 多子节点节点结构
        //    var args = [TreeNode, treeProps].concat(branches[component])
        //
        //    console.log(args)
        //    cooked = React.createElement.apply(this, args)
        //}
        //
        //if (component.props.name === 'Container') {
        //    console.log(cooked)
        //}
    },

    componentDidMount: function () {
        editStore.addChangeListener(this.onComponentChange)
        treeStore.addMountListener(this.onEditMounted)
    },

    getChild: function (root) {
        var name = root.name
        var _this = this
        var newNodeProps = {
            title: name,
            component: root.component
        }
        var children
        var treeNode

        if (root.childs && root.childs.length > 0) {
            children = root.childs.map((item, index) => {
                return _this.getChild(item)
            })
            treeNode = <TreeNode {...newNodeProps}>{children}</TreeNode>
        }
        else {
            treeNode = <TreeNode {...newNodeProps}></TreeNode>
        }

        //treeNodes[root.component] = treeNode

        return treeNode
    },

    render: function () {
        let tree;

        var rootNode = this.state.rootNode;

        tree = (
            <div key="tree" className="layout">
                <Tree defaultExpandAll={true} checkable={false} onSelect={this.onSelect} multiple={false}>
                    {rootNode}
                </Tree>
            </div>
        );

        return (
            <div>
                {tree}
            </div>
        )
    }
});

module.exports = ComponentTree;