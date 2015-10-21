var React = require('react');
var EnterAnimation = require('antd/lib/enter-animation');
var Tree = require('antd/lib/tree');
var TreeNode = Tree.TreeNode;
var Analyse = require('../../util/analyse');
var _ = require('lodash');

function hasChildren (element) {
    return element.children.length > 0;
}

require('./index.scss');

var root = require('../../phone-edit/index');

var componentBlackList = ['Edit'];

var treeState = Analyse(root);

debugger;

var treeData = {};

/**
 * 根据黑名单移除多余的组件
 * @param treeSource
 * @param componentBlackList
 * @returns {object}
 */
function removeBlackList (treeSource, componentBlackList) {
    var tmpSource = _.cloneDeep(treeSource);
    var deepest = 0;


    _.each(tmpSource, function (component, index) {
        if (_.isObject(component)) {
            var name = component.component;
            if (componentBlackList.join(',').indexOf(name) > -1) {

                var parent = component.parent;
                var children = component.children;
                var deep = tmpSource[parent].deep + 1;
                var parentChildren = tmpSource[parent].children;

                if (deep > deepest) {
                    tmpSource.__deepest = deep;
                }

                parentChildren = _.filter(parentChildren, function (value) {
                    var name = tmpSource[value.key].component;

                    return componentBlackList.join(',').indexOf(name) === -1;
                });

                children = _.map(children, function (childComponent) {
                    var key = childComponent.key;
                    tmpSource[key].parent = parent;
                    tmpSource[key].deep = deep;
                    childComponent.parent = parent;
                    return childComponent;
                });

                tmpSource[parent].children = parentChildren.concat(children);

                delete tmpSource[index];
            }
        }
    });

    return tmpSource;
}


function buildTreeData (treeState) {
    var Root = treeState[treeState.__root];

    treeData['Root'] = Root;
}


let ComponentTree = React.createClass({
    render: function () {
        const animation = {
            enter: {
                type: 'right'
            }
        };

        let tree;

        function handleCheck(info) {
            console.log('check: ', info);
        }

        tree = (
            <EnterAnimation enter={animation.enter}>
               <div key="tree" class="layout">
                   <Tree defaultExpandAll={true} checkable={true} onCheck={handleCheck}>
                       <TreeNode title="parent 1">
                           <TreeNode title="leaf" />
                           <TreeNode title="parent 1-1">
                               <TreeNode title="parent 2-1">
                                   <TreeNode title="leaf" />
                                   <TreeNode title="leaf" />
                               </TreeNode>
                               <TreeNode title="leaf" />
                           </TreeNode>
                       </TreeNode>
                   </Tree>
               </div>
            </EnterAnimation>
        );

        return (
            <div>
                {tree}
            </div>
        )
    }
});

module.exports = ComponentTree;