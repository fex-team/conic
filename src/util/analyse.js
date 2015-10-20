/**
 * @author dongtiancheng
 * @date 15/10/13.
 * @email dongtiancheng@baidu.com
 */

var React = require('react');
var _ = require('lodash');

/**
 * 获取 React 组件的原型函数
 * @param instance
 * @returns {object} React Component
 */
function getReactClassComponent (instance) {
    return instance.prototype;
}

/**
 * 获取 React 组件的子组件
 * @param component
 * @returns {*}
 */
function getComponentChildElement (component) {
    if (! component.render) {
        return null;
    }

    return component.render();
}

/**
 * 获取 Root 直系子代
 * @param root
 * @returns {*}
 */
function getRootChildElement (root) {
    return getComponentChildElement(getReactClassComponent(root));
}

/**
 * 获取 React Element 的类型
 * @param element
 * @returns {*}
 */
function getElementClass (element) {
    return element.type;
}

/**
 * 获取 React Element 的子 Element
 * @param element
 * @returns {Array}
 */
function getElementChildren (element) {
    var childrens = element.props.children;

    if (_.isArray(childrens)) {
        return childrens;
    } else if (_.isObject(childrens) || _.isString(childrens)) {
        return [childrens];
    } else {
        return [];
    }
}

/**
 * 判断组件是否为 React Class
 * @param component
 * @returns {boolean}
 */
function isReactClass (component) {
    return _.isFunction(component.type);
}

/**
 * 判断组件是否为 React HTML 组件
 * @param component
 * @returns {*}
 */
function isHtmlClass (component) {
    return _.isString(component.type);
}

/**
 * 判断 React Element 是否有子元素
 * @param element
 * @returns {boolean}
 */
function hasChildren (element) {
    var isReactElement = _.isObject(element);
    var isArrayChildren;

    if (isReactElement) {
        isArrayChildren = element.props.children instanceof Array;

        if (isArrayChildren) {
            return !!element.props.children.length > 0;
        } else if (element){
            return true;
        }
    } else {
        return false;
    }
}

/**
 * 过滤掉 props 属性
 * @param props
 * @returns {*}
 */
function getNoChildrenProps (props) {
    var tmp = _.cloneDeep(props);

    if (_.isArray(tmp.children) || _.isObject(tmp.children)) {
        delete tmp.children;
    }
    return tmp;
}

/**
 * JSON 描述文件生成器
 */
function generator (Root, RootProps) {
    var Maps = {};
    var childName;
    var root = getRootChildElement(Root);
    var deepest = 0;

    RootProps = RootProps || {};

    Maps['__root'] = Root.displayName + '&0';
    Maps[Root.displayName + '&0'] = {
        component: Root.displayName,
        isClass: true,
        props: getNoChildrenProps(RootProps),
        children: [
            {
                isClass: isReactClass(root),
                key: root.type + '&' + JSON.stringify(getNoChildrenProps(root.props)) + '&0'
            }
        ],
        deep: 0,
        parent: null
    };


    function run (rootChild, parent, deep) {
        var index;
        var children;
        var childrens = getElementChildren(rootChild);
        var mapIndex;
        var rootChildType;
        var noChildrenProps = getNoChildrenProps(rootChild.props);

        deep++;

        if (deep > deepest) {
            deepest = deep;
        }

        if (isReactClass(rootChild)) {
            mapIndex = rootChild.type.displayName + '&0';

            if (Maps[mapIndex]) {
                do {
                    index = parseInt(mapIndex.split('&').slice(-1)[0], 10);
                    index++;
                    mapIndex = mapIndex.split('&').slice(0, -1).join('&') + '&' + index;
                }
                while (Maps[mapIndex]);
            }

            Maps[mapIndex] = {
                component: rootChild.type.displayName,
                props: noChildrenProps,
                isClass: true,
                parent: parent,
                deep: deep
            }
        }
        else if (isHtmlClass(rootChild)) {
            rootChildType = rootChild.type;

            mapIndex = rootChildType + '&' + JSON.stringify(noChildrenProps) + '&0';

            if (Maps[mapIndex]) {
                do {
                    index = parseInt(mapIndex.split('&').slice(-1)[0], 10);
                    index++;
                    mapIndex = mapIndex.split('&').slice(0, -1).join('&') + '&' + index;
                }
                while (Maps[mapIndex]);
            }

            Maps[mapIndex] = {
                component: rootChild.type,
                isClass: false,
                props: noChildrenProps,
                parent: parent,
                deep: deep
            }
        }

        // 有子节点
        if (childrens.length > 0) {
            for (var i = 0; i < childrens.length; i ++) {
                children = childrens[i];

                if (!Maps[mapIndex].children) {
                    Maps[mapIndex].children = [];
                }

                var childrenObj = {};

                if (isReactClass(children)) {

                    childrenObj.isClass =  true;
                    childrenObj.props = getNoChildrenProps(children.props);
                    childrenObj.parent = mapIndex;

                    index = 0;
                    while (Maps[children.type.displayName + '&' + index]) {
                        index++;
                    }

                    childName = children.type.displayName + '&' + index;
                    childrenObj.key = childName;

                    Maps[mapIndex].children.push(childrenObj);

                    if (hasChildren(children)) {
                        run(children, mapIndex, deep);
                    }
                } else if (isHtmlClass(children)) {

                    childrenObj.isClass = false;
                    childrenObj.props = getNoChildrenProps(children.props);
                    childrenObj.parent = mapIndex;

                    index = 0;
                    while (Maps[children.type + '&' + JSON.stringify(children.props) + '&' + index]) {
                        index++;
                    }

                    childName = children.type;
                    childrenObj.key = childName + '&' + JSON.stringify(childrenObj.props) + '&' + index;
                    Maps[mapIndex].children.push(childrenObj);

                    if (hasChildren(children)) {
                        run(children, mapIndex, deep);
                    }
                } else if (_.isString(children)) {

                    childrenObj.isClass = false;
                    childrenObj.key = false;
                    childrenObj.text = children;
                    childrenObj.parent = mapIndex;

                    Maps[mapIndex].children.push(childrenObj);
                }
            }
        }
    }

    run(root, Root.displayName + '&0', 0);

    Maps['__deepest'] = deepest;

    return Maps;
}

module.exports = generator;