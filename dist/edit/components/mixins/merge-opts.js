var React = require('react');
var _ = require('lodash');
var $ = require('jquery');

module.exports = {
    componentWillMount: function () {
        this.mergeOpts(this.props.opts, this.props.mode);
    },

    componentWillReceiveProps: function (nextProps) {
        this.mergeOpts(nextProps.opts, this.props.mode);
    },

    mergeOpts: function (customOpts, mode) {
        this.mergedOpts = $.extend(true, _.cloneDeep(this.props.defaultOpts), _.cloneDeep(customOpts));

        // 如果在编辑状态
        if (mode === 'edit') {
            // 宽100%
            if (this.mergedOpts.style && this.mergedOpts.style.value.width) {
                this.mergedOpts.style.value.width = '100%';
            }
            // 如果高度是百分比，改成100%
            if (this.mergedOpts.style && _.isString(this.mergedOpts.style.value.height) && this.mergedOpts.style.value.height.indexOf('%') > -1) {
                this.mergedOpts.style.value.height = '100%';
            }
            if (this.mergedOpts.style && _.isString(this.mergedOpts.style.value.minHeight) && this.mergedOpts.style.value.minHeight.indexOf('%') > -1) {
                this.mergedOpts.style.value.minHeight = '100%';
            }
            // 外边距清空
            if (this.mergedOpts.style && this.mergedOpts.style.value.margin) {
                this.mergedOpts.style.value.margin = null;
            }
        }
    }
};