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
 * 解析带有&的名称
 * @param name
 * @returns {{}}
 */
function unSerialize(name) {
    var obj = {};
    var splits = {};

    if (splits.length === 2) {
        obj.index = splits[1];
    }
    else if (splits.length === 3) {
        obj.props = JSON.parse(splits[1]);
        obj.index = splits[2];
    }

    return obj;
}

/**
 * 是否为React 组件
 */
function isReactComponent () {

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

function generate (pageSource) {
    var root;
    var rootKey = pageSource.__root;
    var rootComponent = pageSource[rootKey];
    var rootName;
    var rootProps;
    var rootElement;
    var rootChildren;
    var element;

    // 检查组件依赖
    var missingComponents = checkComponents(pageSource);

    // 需要的组件完整
    if (_.isEmpty(missingComponents)) {
        root = pageSource[rootKey];
        rootName = root.component;
        rootChildren = pageSource[root.children];

        rootElement = React.createElement(rootName, root.props, rootChildren);


        debugger;
    }
    else {

    }
}

module.exports = generate;