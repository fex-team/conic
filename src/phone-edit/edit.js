var React = require('react')
var DragSource = require('../toolbar/top/component/drag-source')
var DragSourceAbsolute = require('../toolbar/top/component/drag-source-absolute')
var DragTarget = require('./drag-target')
var editAction = require('../actions/edit-action')
var editStore = require('../stores/edit-store')
var classNames = require('classnames')
var _ = require('lodash')
var $ = require('jquery')

const Edit = React.createClass({
    getInitialState: function () {
        return {
            enabledTarget: true,
            // 自定义属性
            customOpts: this.props.customOpts,
            // 包含的组件属性
            childProps: this.props.children && _.cloneDeep(this.props.children.props),
            // 子元素属性数组
            childs: this.props.childs,
            selected: false
        }
    },

    componentWillReceiveProps: function (nextProps) {
        // 更新state中customOpts
        if (!_.isEqual(this.state.customOpts, nextProps.customOpts) || (this.state.selected && editStore.get() !== this)) {
            this.setState({
                customOpts: nextProps.customOpts,
                selected: false
            })
        }
    },

    // 取消选择状态
    unSelected: function () {
        this.setState({
            selected: false
        })
    },

    // 触发选择组件事件
    onClick: function (event) {
        event && event.stopPropagation()

        if (this.state.selected) {
            return
        }

        this.setState({
            selected: true
        })
        editAction.selectComponent(this)
    },

    // 触发修改子元素事件(由edit-store直接调用)
    UpdateChildren: function (opts) {
        this.setState({
            customOpts: $.extend(true, this.state.customOpts, opts)
        }, function () {
            // 更新父级childs 如果有父级的话（手机壳就没有）
            this.props.parent && this.props.parent.UpdateChilds(this.props.index, this.state.customOpts)
        })
    },

    // 更新自身childs
    UpdateChilds: function (index, opts) {
        let newChilds = this.state.childs
        newChilds[index].opts = opts
        this.setState({
            childs: newChilds
        })
    },

    // 修改是否可以作为拖拽目标（当父级dragsource被拖动时，禁止子dragtarget生效）
    onChangeEnableTarget: function (isOk) {
        this.setState({
            enabledTarget: isOk
        })
    },

    // 拖拽某个元素进来
    onDrop: function (item) {
        // 如果item的edit的parent是自己，则不执行任何操作
        if (item.edit && item.edit.props.parent === this) {
            return
        }

        let newChilds = this.state.childs

        // 分配一个唯一key
        let uniqueKey = 0
        if (newChilds.length > 0) {
            uniqueKey = newChilds[newChilds.length - 1].uniqueKey + 1
        }

        // 添加子元素的属性
        let childInfo = {
            name: item.type,
            uniqueKey: uniqueKey
        }

        // 如果有edit，加上属性
        if (item.edit) {
            childInfo.opts = item.edit.state.customOpts
            childInfo.childs = item.edit.state.childs
        }

        newChilds.push(childInfo)

        this.setState({
            childs: newChilds
        }, function () {
            // 如果是已在界面上的组件，移除
            if (item.existComponent) {
                item.edit.removeSelf()
            }
        })
    },

    removeChild: function (index) {
        let newChilds = this.state.childs
        _.pullAt(newChilds, index)

        this.setState({
            childs: newChilds
        })
    },

    removeSelf: function () {
        this.props.parent.removeChild(this.props.index)
    },

    // 绝对定位拖拽元素属性变化
    onDragSourceAbsoluteChange: function (opts) {
        // 与customOpts作merge
        this.setState({
            customOpts: $.extend(true, this.state.customOpts, opts)
        }, function () {
            // 更新父级childs 如果有父级的话（手机壳就没有）
            this.props.parent && this.props.parent.UpdateChilds(this.props.index, this.state.customOpts)
            // 同步左侧编辑器内容
            editAction.selectComponent(this)
        })
    },

    render: function () {
        let className = classNames([
            {'selected': this.state.selected},
            {'absolute': this.props.dragSourceAbsolute}
        ])

        let newChildProps = _.cloneDeep(this.state.childProps)
        // 将edit本身传给子组件
        newChildProps.edit = this
        // 将自定义属性与组件原本属性merge
        newChildProps.opts = $.extend(true, newChildProps.opts, this.state.customOpts)
        newChildProps.childs = this.state.childs

        let childComponent = (
            <div className={className}
                 onClick={this.onClick}>
                {React.cloneElement(this.props.children, newChildProps)}
            </div>
        )

        if (this.props.dragSource) {
            childComponent = (
                <DragSource onChangeEnableTarget={this.onChangeEnableTarget}
                            type={newChildProps.name}
                            existComponent={true}
                            edit={this}>
                    {childComponent}
                </DragSource>
            )
        }

        if (this.props.dragTarget) {
            childComponent = (
                <DragTarget enabledTarget={this.state.enabledTarget}
                            onDrop={this.onDrop}
                            absolute={this.props.dragSourceAbsolute}>{childComponent}</DragTarget>
            )
        }

        // 绝对定位要包在最外层，所以判断逻辑放最后
        if (this.props.dragSourceAbsolute) {
            childComponent = (
                <DragSourceAbsolute type={newChildProps.name}
                                    left={newChildProps.opts.position.value.left}
                                    top={newChildProps.opts.position.value.top}
                                    onChange={this.onDragSourceAbsoluteChange}
                                    edit={this}>
                    {childComponent}
                </DragSourceAbsolute>
            )
        }

        return (
            <div>
                {childComponent}
            </div>
        )
    }
})

module.exports = Edit