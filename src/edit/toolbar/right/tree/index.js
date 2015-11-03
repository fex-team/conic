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

var treeNodes = []
var branches = {}
var cooked

let ComponentTree = React.createClass({
    getInitialState: function () {
        return {
            cooked: cooked
        }
    },

    onSelect: function (e) {
        console.log(e);
    },

    onComponentChange: function () {
        console.log(editStore.get())
    },

    onEditMounted: function (component) {
        let editChildrenProps = component.childInstance.props;

        let treeProps = {
            title: editChildrenProps.name,
            component: component,
            key: Math.random() * 10000,
            ref: (ref) => {

            }
        }

        if (!cooked && component.props.childs.length === 0) {
            // 叶子
            cooked = <TreeNode {...treeProps}></TreeNode>
        } else if (cooked && component.props.childs.length === 0) {
            // 另外一个分支
            let cookedParent = cooked.props.component.parent;
            if (!branches[cookedParent]) {
                branches[cookedParent] = [cooked]
            } else {
                branches[cookedParent].push(cooked)
            }
            cooked = <TreeNode {...treeProps}></TreeNode>
        } else if (component.props.childs.length === 1 && component === cooked.props.component.parent){
            // 单子节点节点结构
            cooked = <TreeNode {...treeProps}>{cooked}</TreeNode>
        } else if (component.props.childs.length > 1 && component in branches) {
            // 多子节点节点结构
            cooked = <TreeNode {...treeProps}>{branches[component]}</TreeNode>
        }
        console.log(cooked)
    },

    componentDidMount: function () {
        editStore.addChangeListener(this.onComponentChange)
        treeStore.addMountListener(this.onEditMounted)
    },

    getChild: function (root, index) {
        var name = root.name
        var index = index || 0
        var _this = this
        var newNodeProps = {
            title: name,
            key: Math.random() * 10000
        }
        var children

        if (root.childs && root.childs.length > 0) {
            children = root.childs.map((item, index) => {
                return _this.getChild(item, index)
            })
            return <TreeNode {...newNodeProps}>{children}</TreeNode>
        }
        else {
            return <TreeNode {...newNodeProps}></TreeNode>
        }

    },

    render: function () {
        let tree;

        var treeNodes = this.getChild(defaultJson)

        console.log(cooked)

        tree = (
            <div key="tree" className="layout">
                <Tree defaultExpandAll={true} checkable={false} onSelect={this.onSelect} multiple={false}>
                    {treeNodes}
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