const editStore = require('../../stores/edit-store')
const historyAction = require('../../actions/history-action')
const editAction = require('../../actions/edit-action')
const getPosition = require('../lib/get-position')
const getTree = require('../lib/get-tree')
const $ = require('jquery')
const _ = require('lodash')
const isParentEdit = require('../lib/is-parent-edit')

module.exports = {
    // 拖拽某个元素进来
    onDrop: function (item) {
        // 如果正在拖拽的组件是当前组件的父级（无限向上递归），或者是子一级，或者是自身，则不进行任何操作
        if (item.edit && item.edit === this) {
            return
        }

        if (item.edit && item.edit.props.parent === this) {
            return
        }

        if (item.edit && isParentEdit(this, item.edit)) {
            return
        }

        let newChilds = _.cloneDeep(this.state.childs)

        // 添加子元素的属性
        let childInfo = {
            name: item.type,
            uniqueKey: editStore.getUniqueKey(),
            selected: item.edit ? item.edit.state.selected : false
        }

        // 如果这个组件是新拖拽的万能矩形，不是最外层，则宽度设定为父级宽度的一半
        if (!item.edit && item.type === 'LayoutBox' && this.props.children.props.name !== 'Container') {
            // 获取拖拽父级的布局方式
            let parentFlexDirection = this.state.customOpts && this.state.customOpts.flex && this.state.customOpts.flex.value.flexDirection || 'row'

            let customHeight = this.state.customOpts && this.state.customOpts.style && this.state.customOpts.style.value.height

            let baseHeight = this.props.children.props.defaultOpts.style.value.height
            let parentHeight = customHeight || baseHeight

            childInfo.opts = $.extend(true, childInfo.opts, {
                style: {
                    value: {
                        width: parentFlexDirection === 'row' || parentFlexDirection === 'row-reverse' ? '50%' : '100%',
                        height: parentFlexDirection === 'column' || parentFlexDirection === 'column-reverse' ? parentHeight / 2 : parentHeight
                    }
                }
            })
        }

        // 如果有edit，是从模拟器中拖拽的元素，保留原有属性
        if (item.edit) {
            childInfo.opts = item.edit.state.customOpts
            // 循环所有childs附加到当前state上（如果有子元素）
            if (item.edit.state.childs) {
                let info = {}
                getTree(item.edit, info)
                childInfo.childs = info.childs
            }

            // 记录拖拽
            let positionArray = []
            getPosition(item.edit, positionArray)
            let afterPositionArray = []
            getPosition(this, afterPositionArray)
            afterPositionArray.unshift(childInfo.uniqueKey)
            let info = {}
            getTree(item.edit, info)
            setTimeout(()=> {
                historyAction.addHistory({
                    position: positionArray,
                    afterPosition: afterPositionArray,
                    beforeUniqueKey: item.edit.props.uniqueKey,
                    uniqueKey: childInfo.uniqueKey,
                    componentName: childInfo.name,
                    childs: info.childs,
                    opts: _.cloneDeep($.extend(true, item.edit.state.customOpts, childInfo.opts)),
                    type: 'move',
                    operateName: '移动组件 ' + childInfo.name
                })
            })
        } else { // 否则为新增组件
            let positionArray = []
            getPosition(this, positionArray)
            positionArray.unshift(childInfo.uniqueKey)
            setTimeout(()=> {
                historyAction.addHistory({
                    position: positionArray,
                    uniqueKey: childInfo.uniqueKey,
                    componentName: childInfo.name,
                    opts: _.cloneDeep(childInfo.opts),
                    type: 'add',
                    operateName: '新增组件 ' + childInfo.name
                })
            })
        }

        newChilds.push(childInfo)

        this.setState({
            childs: newChilds
        }, function () {
            if (item.existComponent) {
                // 销毁组件
                item.edit.removeSelf(false)
            }

            // 通知drag结束
            editAction.finishDropComponent(this)
        })
    },

    // 拖拽绝对定位组件进来，由布局->自由矩形直接调用
    dropAbsolute: function (item) {
        let newChilds = _.cloneDeep(this.state.childs)

        // 添加子元素的属性
        let childInfo = {
            name: item.type,
            uniqueKey: editStore.getUniqueKey(),
            selected: false,
            opts: item.opts
        }

        // 加入历史纪录
        let positionArray = []
        getPosition(this, positionArray)
        positionArray.unshift(childInfo.uniqueKey)
        setTimeout(()=> {
            historyAction.addHistory({
                position: positionArray,
                uniqueKey: childInfo.uniqueKey,
                componentName: childInfo.name,
                opts: _.cloneDeep(childInfo.opts),
                type: 'add',
                operateName: '新增组件 ' + childInfo.name
            })
        })

        newChilds.push(childInfo)

        this.setState({
            childs: newChilds
        })
    },

    // 绝对定位组件开始拖拽
    onAbsoluteDragStart:function(){
        editAction.startDragAbsoluteComponent(this)
    },

    // 绝对定位组件结束拖拽
    onAbsoluteDragEnd:function(){
        editAction.endDragAbsoluteComponent(this)
    },

    // 绝对定位拖拽元素属性变化
    onDragSourceAbsoluteChange: function (opts) {
        editAction.startDropComponent(this)

        // 与customOpts作merge
        var mergeOpts = $.extend(true, _.cloneDeep(this.state.customOpts), opts)

        let positionArray = []
        getPosition(this, positionArray)
        historyAction.addHistory({
            position: positionArray,
            optsBefore: _.cloneDeep(this.state.customOpts),
            optsAfter: _.cloneDeep(mergeOpts),
            type: 'update',
            operateName: this.props.children.props.name + ' 移动'
        })

        this.setState({
            customOpts: mergeOpts
        }, function () {
            // 同步左侧编辑器内容，如果选中了
            if (this.state.selected) {
                editAction.freshComponent(this)
            }
        })
    },

    // 当前拖拽框正在有元素被拖入
    onDragHover: function () {
        editAction.setDragHoverComponent(this)
    },

    // 所有子元素添加变小动画
    scaleChildsSmaller: function () {
        // 如果没有父元素，取消操作
        if (!this.props.parent) return

        this.props.parent.childInstance.childEdits.map((item)=> {
            item.$dom.removeClass('to-normal').addClass('to-small')
        })
    },

    // 所有子元素添加变大动画
    resetChildsScale: function () {
        // 如果没有父元素，取消操作
        if (!this.props.parent) return

        this.props.parent.childInstance.childEdits.map((item)=> {
            item.$dom.removeClass('to-small').addClass('to-normal')
        })
    }
}