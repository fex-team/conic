var React = require('react')
var _ = require('lodash')
var $ = require('jquery')

module.exports = {
    componentWillMount: function () {
        this.mergeOpts(this.props.opts)
    },

    componentWillReceiveProps: function (nextProps) {
        this.mergeOpts(nextProps.opts)
    },

    mergeOpts: function (customOpts) {
        this.mergedOpts = $.extend(true, _.cloneDeep(this.props.defaultOpts), _.cloneDeep(customOpts))
    }
}