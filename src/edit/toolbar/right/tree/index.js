var React = require('react')
var EnterAnimation = require('antd/lib/enter-animation')
var TreeNode = require('./treeNode')
var editStore = require('../../../stores/edit-store')
var treeStore = require('../../../stores/tree-store')
var _ = require('lodash');
var defaultJson = require('../../../phone-edit/default.json')
var treeAction = require('../../../actions/tree-action')

require('./index.scss');

// 根据edit生成树状json配置
function getTree(edit, info, index) {
    info.childs = _.cloneDeep(edit.state.childs, function (value, name) {
        if (name === 'childs') {
            return value;
        }
    })
    info.component = edit
    info.index = index
    info.uniqueKey = edit.props.uniqueKey
    edit.childInstance.getChildsEdit && edit.childInstance.getChildsEdit().map((item, index)=> {
        getTree(item, info.childs[index], index)
    })
}

const animation = {
    enter: {
        type: 'right'
    }
};

function expand (component, info) {
    var treeNode = component.treeNode
    treeNode.expand()
    component.childInstance.getChildsEdit && component.childInstance.getChildsEdit().map((item, index)=> {
        expand(item, info.childs[index])
    })
}

function collapse (component, info) {
    var treeNode = component.treeNode
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
        let container = editStore.getContainer()

        var info = {}
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
            <div namespace>
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