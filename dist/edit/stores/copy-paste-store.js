const dispatcher = require('../dispatcher');
const EventEmitter = require('events').EventEmitter;
const assign = require('object-assign');
const editStore = require('../stores/edit-store');
const getTreeCopy = require('../phone-edit/lib/get-tree-copy');
const _ = require('lodash');

const ViewStore = assign({}, EventEmitter.prototype, {});
const getNodeTree = require('../toolbar/right/tree/get-tree');

// 剪贴板中内容
let copyInfo = null;

ViewStore.dispatchToken = dispatcher.register(function (action) {
    let nowSelectComponent;
    switch (action.type) {
        case 'copy':
            nowSelectComponent = editStore.get();
            if (nowSelectComponent === null) return;

            // 无法拷贝手机壳
            if (nowSelectComponent.props.children.props.name === 'Container') return;

            let info = {};
            getTreeCopy(nowSelectComponent, info);
            info.name = nowSelectComponent.props.children.props.name;
            copyInfo = info;
            break;
        case 'paste':
            if (copyInfo === null) return;
            nowSelectComponent = editStore.get();
            if (nowSelectComponent === null) return;
            copyInfo.uniqueKey = editStore.getUniqueKey();

            // 如果当前选择组件不是布局组件，则复制到父级
            let nowSelectComponentName = nowSelectComponent.props.children.props.name;
            if (nowSelectComponentName !== 'LayoutBox' && nowSelectComponentName !== 'LayoutBoxAbsolute' && nowSelectComponentName !== 'Container') {
                nowSelectComponent.props.parent.addChild(_.cloneDeep(copyInfo));

                setTimeout(() => {
                    let addedComponent = _.find(nowSelectComponent.props.parent.childInstance.getChildsEdit(), value => {
                        return value.props.uniqueKey === copyInfo.uniqueKey;
                    });

                    let newCopyInfo = _.cloneDeep(copyInfo);

                    getNodeTree(addedComponent, newCopyInfo, 0);

                    nowSelectComponent.props.parent.treeNode.addChild(newCopyInfo);
                });
            } else {
                nowSelectComponent.addChild(_.cloneDeep(copyInfo));

                setTimeout(() => {
                    let addedComponent = _.find(nowSelectComponent.childInstance.getChildsEdit(), value => {
                        return value.props.uniqueKey === copyInfo.uniqueKey;
                    });

                    let newCopyInfo = _.cloneDeep(copyInfo);

                    getNodeTree(addedComponent, newCopyInfo, 0);

                    nowSelectComponent.treeNode.addChild(newCopyInfo);
                });
            }
            break;
    }
});

module.exports = ViewStore;