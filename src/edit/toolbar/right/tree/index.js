const React = require('react')
const TreeNode = require('./treeNode')
const editStore = require('../../../stores/edit-store')
const treeStore = require('../../../stores/tree-store')
const _ = require('lodash');
const treeAction = require('../../../actions/tree-action')
const getTree = require('./get-tree')
const treeNodeStore = require('../../../stores/tree-node-store')

require('./index.scss');

const animation = {
    enter: {
        type: 'right'
    }
};

function updateInfo(childInfo, info) {
    if (info.component === childInfo.component.props.parent) {
        info.childs.push(childInfo)
    }
    else {
        info.childs.map((item) => {
            updateInfo(childInfo, item)
        })
    }
}

function expand (component, info) {
    let treeNode = component.treeNode
    treeNode.expand()
    component.childInstance.getChildsEdit && component.childInstance.getChildsEdit().map((item, index)=> {
        expand(item, info.childs[index])
    })
}

function collapse (component, info) {
    let treeNode = component.treeNode
    treeNode.collapse()
    component.childInstance.getChildsEdit && component.childInstance.getChildsEdit().map((item, index)=> {
        collapse(item, info.childs[index])
    })
}

let ComponentTree = React.createClass({
    getInitialState: function () {
        return {
            info: {}
        }
    },

    componentDidMount: function () {
        setTimeout(() => {
            let container = editStore.getContainer()

            let info = {}
            getTree(container, info, 0)

            info['name'] = '手机壳'
            info['key'] = 0
            info['padding'] = 1
            info['ref'] = (ref) => {
                info.component.treeNode = ref
            }

            this.setState({
                info: info
            })
        });

        treeNodeStore.addAddListener(this.addTreeNode)
        treeStore.addRefreshListener(this.refreshTree)
    },

    addTreeNode: function (item, component, childInfo) {
        setTimeout(() => {
            var info = this.state.info
            updateInfo(childInfo, info)
        })
    },

    refreshTree: function () {
        let container = editStore.getContainer()
        let info = {}

        getTree(container, info, 0)

        info['name'] = '手机壳'
        info['key'] = 0
        info['padding'] = 1
        info['ref'] = (ref) => {
            info.component.treeNode = ref
        }

        //this.setState({
        //    info: info
        //})
    },

    expandAll: function () {
        var info = this.state.info
        expand(info.component, info)
    },

    collapseAll: function () {
        var info = this.state.info
        collapse(info.component, info)
    },

    render: function () {
        let info = this.state.info

        return (
            <div _namespace>
                <div className="navigator clearfix">
                    <div className="title">导航</div>
                    <div className="nav-buttons">
                        <span onClick={this.expandAll}>全部展开</span>
                        <span onClick={this.collapseAll}>全部闭合</span>
                    </div>
                </div>
                <TreeNode {...info} />
            </div>
        )
    }
});

module.exports = ComponentTree;