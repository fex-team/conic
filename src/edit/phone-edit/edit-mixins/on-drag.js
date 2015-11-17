const editStore = require('../../stores/edit-store')
const historyAction = require('../../actions/history-action')
const editAction = require('../../actions/edit-action')
const getPosition = require('../lib/get-position')
const getTree = require('../lib/get-tree')
const $ = require('jquery')
const _ = require('lodash')

module.exports = {
    // 拖拽某个元素进来
    onDrop: function (item) {
        // 如果item的edit的parent是自己，则不执行任何操作
        if (item.edit && item.edit.props.parent === this) {
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

    // 绝对定位拖拽元素属性变化
    onDragSourceAbsoluteChange: function (opts) {
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
    }
}