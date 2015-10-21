/**
 * @author dongtiancheng
 * @date 15/10/13.
 * @email dongtiancheng@baidu.com
 */

var components = require('../components');
var ReactDOM = require('react-dom');
var React = require('react');
var _ = require('lodash');

/**
 * 是否是 React Element 组件
 * @param element
 * @returns {*}
 */
function isReactElement (element) {
    return _.isString(element.type);
}


/**
 * 检查是否存在缺少组件
 * @param pageSource
 * @returns {Array}
 */
function checkComponents (pageSource) {
    return _.filter(pageSource, function (value, name) {
        var pageComponentName = value.component;
        if (_.isObject(value) && value.isClass && name !== pageSource.__root) {
            return !components[pageComponentName];
        }
    });
}

/**
 * 找到树指定层的节点
 * @param pageSource
 * @param deep
 * @returns {Array}
 */
function findDeepChildren (pageSource, deep) {
    var gradeChildrens = [];

    _.each(pageSource, function (component, name) {
        if (_.isObject(component) && component.deep === deep) {
            component.key = name;
            gradeChildrens.push(component);
        }
    });

    return gradeChildrens;
}


/**
 * 获取一个组件的父节点对象的索引值
 * @param element
 * @returns {string}
 */
function findParent (element) {
    return element.parent;
}

/**
 * 创建 React Element 元素
 * @param name
 * @param props
 * @param children
 * @returns {*}
 */
function createReactElement (name, props, children) {
    if (!name) {
        return {};
    }

    props = props || {};

    if (_.isString(name) && _.isArray(children) && _.every(children, isReactElement)) {
        return React.createElement.apply(null, [name, props].concat(children));
    }
}

function addEditComponent (pageSource) {
    var tmpSource = _.cloneDeep(pageSource);
    var deepest = 0;
    var editIndex = 0;

    _.each(tmpSource, function (component, index) {
        if (_.isObject(component)) {
            var name = component.component;

            var deep = tmpSource[parent].deep + 2;

            if (deep > deepest) {
                tmpSource.__deepest = deep;
            }

            var editJson = {
                component: 'Edit'
            }



            //parentChildren = _.filter(parentChildren, function (value) {
            //    var name = tmpSource[value.key].component;
            //
            //    return componentBlackList.join(',').indexOf(name) === -1;
            //});
            //
            //children = _.map(children, function (childComponent) {
            //    var key = childComponent.key;
            //    tmpSource[key].parent = parent;
            //    tmpSource[key].deep = deep;
            //    childComponent.parent = parent;
            //    return childComponent;
            //});
            //
            //tmpSource[parent].children = parentChildren.concat(children);
            //
            //delete tmpSource[index];
        }
    });
}


function generate (pageSource) {
    var root;
    var rootKey = pageSource.__root;
    var rootChild = pageSource[rootKey].children[0];
    var rootChildKey = rootChild.key;
    var wrapper = pageSource[rootChildKey].children[0];
    var wrapperKey = wrapper.key;
    var gradeChildrens;
    var gradeChildrenElements = [];
    var deep = pageSource.__deepest;
    var elementCache = {};

    // 检查组件依赖
    var missingComponents = checkComponents(pageSource);

    // 需要的组件完整
    if (_.isEmpty(missingComponents)) {

        while (deep > 0) {
            gradeChildrens = findDeepChildren(pageSource, deep);
            gradeChildrenElements.push(gradeChildrens);
            deep--;
        }

        _.each(gradeChildrenElements, function (childArr, index) {
            _.each(childArr, function (child) {
                var key = child.key;
                var childElements = [];

                if (index > 0) {
                    _.each(child.children, function (value) {
                        var element = elementCache[value.key];
                        childElements.push(element);
                    });
                }
                elementCache[key] = createReactElement(child.component, child.props, childElements);
            });
        });

        return elementCache[wrapperKey];
    }
    else {
        console.warn('missing components:' + missingComponents.join(','));
    }
}

module.exports = generate;