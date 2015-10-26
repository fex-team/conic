var React = require('react')
var DragSource = require('../toolbar/top/component/drag-source')
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
        event.stopPropagation()

        if (this.state.selected) {
            return
        }

        this.setState({
            selected: true
        })
        editAction.selectComponent(this)
    },

    // 触发修改子元素事件(由edit-action直接调用)
    UpdateChildren: function (opts) {
        this.setState({
            customOpts: $.extend(true, this.state.customOpts, opts)
        }, function () {
            // 更新父级childs
            this.props.parent.UpdateChilds(this.props.index, this.state.customOpts)
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

        // 如果有自定义属性，添加上
        if (item.customOpts) {
            childInfo.opts = item.customOpts
        }

        // 如果拖拽进来的元素还有子元素，添加上
        if (item.childs) {
            childInfo.childs = item.childs
        }
        newChilds.push(childInfo)

        this.setState({
            childs: newChilds
        }, function () {
            // 如果是已在界面上的组件，移除
            if (item.existComponent) {
                item.removeEditSelf()
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

    render: function () {
        let className = classNames([
            {'selected': this.state.selected}
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
                            onDrop={this.onDrop}>{childComponent}</DragTarget>
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