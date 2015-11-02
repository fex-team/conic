/**
 * @author dongtiancheng
 * @date 15/10/29.
 * @email dongtiancheng@baidu.com
 */
var _ = require('lodash')

function isValueEqual(value, other) {
    function compare(val, name) {
        if (_.isArray(val)) {
            return val.length !== other[name].length;
        }

        if (!_.isObject(val)) {
            return other[name] !== val
        } else if (!val.state && other[name]) {
            return !isValueEqual(val, other[name])
        }
    }

    var result = _.filter(value, compare)
    return result.length === 0
}

var ReactComponentWithPureRenderMixin = {
    shouldComponentUpdate: function (nextProps, nextState) {
        return !isValueEqual(nextProps, this.props) || !isValueEqual(nextState, this.state)
    }
}

module.exports = ReactComponentWithPureRenderMixin