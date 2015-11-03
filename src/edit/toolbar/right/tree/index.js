
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

let ComponentTree = React.createClass({
    getInitialState: function () {
        return {}
    },

    onSelect: function (e) {
        console.log(e);
    },

    onComponentChange: function () {
        console.log(editStore.get())
    },

    componentDidMount: function () {
        editStore.addChangeListener(this.onComponentChange)
    },

    getChild: function (root, index) {
        var name = root.name
        var index = index || 0
        var _this = this
        var newNodeProps = {
            title: name
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