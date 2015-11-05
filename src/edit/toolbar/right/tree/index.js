var React = require('react')
var EnterAnimation = require('antd/lib/enter-animation')
var TreeNode = require('./treeNode')
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
            info: {}
        }
    },

    onSelect: function (e) {
        //var node = e.node
        //var component = node.props.component
        //component.clickAction()
    },

    onEditMounted: function (component) {
        if (component.props.name === 'Container') {
            var info = {}
            getTree(component, info)

            info['name'] = '手机壳'
            info['key'] = 0
            info['padding'] = 1
            info['ref'] = (ref) => {
                info.component.treeNode = ref
            }

            this.setState({
                info: info
            })
        }
    },

    componentDidMount: function () {
        treeStore.addMountListener(this.onEditMounted)
    },

    render: function () {
        let tree;
        let info = this.state.info

        tree = (
            <div key="tree" className="layout">
                <TreeNode {...info} />
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