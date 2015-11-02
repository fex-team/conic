var React = require('react')
var DragSource = require('../toolbar/top/component/drag-source')
var DragSourceAbsolute = require('../toolbar/top/component/drag-source-absolute')
var DragTarget = require('./drag-target')
var editAction = require('../actions/edit-action')
var editStore = require('../stores/edit-store')
var footerAction = require('../actions/footer-action')
var historyAction = require('../actions/history-action')
var classNames = require('classnames')
var _ = require('lodash')
var $ = require('jquery')

// 根据edit生成树状json配置
function getTree(edit, info) {
    info.opts = edit.state.customOpts
    info.childs = edit.state.childs
    edit.childInstance.getChildsEdit && edit.childInstance.getChildsEdit().map((item, index)=> {
        getTree(item, info.childs[index])
    })
}

// 根据edit生成位置数组
function getPosition(edit, positionArray) {
    if (edit.props.parent) {
        positionArray.push(edit.props.uniqueKey)
        getPosition(edit.props.parent, positionArray)
    }
}

const Edit = React.createClass({
    getInitialState: function () {
        return {
            enabledTarget: true,
            // 自定义属性
            customOpts: this.props.opts,
            // 包含的组件属性
            childProps: this.props.children && _.cloneDeep(this.props.children.props),
            // 子元素属性数组
            childs: this.props.childs,
            selected: this.props.selected || false
        }
    },

    componentWillMount: function () {
        // 为每个子组件生成uniqueKey
        this.state.childs.map((item, index)=> {
            item.uniqueKey = index
        })
    },

    componentDidMount: function () {
        setTimeout(function () {
            footerAction.increaseInstanceNumber()
        })

        // 如果默认是选中状态，通知左侧组件更新
        if (this.props.selected) {
            setTimeout(()=> {
                editAction.selectComponent(this)
            })
        }
    },

    componentWillUnmount: function () {
        setTimeout(function () {
            footerAction.reduceInstanceNumber()
        })
    },

    componentWillReceiveProps: function (nextProps) {
        // 更新state中customOpts
        if (!_.isEqual(this.state.customOpts, nextProps.opts) || (this.state.selected && editStore.get() !== this)) {
            this.setState({
                customOpts: $.extend(true, this.state.customOpts, nextProps.opts),
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
        this.clickAction()
    },

    // 触发选择组件事件
    clickAction: function () {
        if (this.state.selected) {
            return
        }

        this.setState({
            selected: true
        })
        editAction.selectComponent(this)
    },

    // 触发修改子元素事件(由edit-store直接调用)
    UpdateChildren: function (opts, historyInfo) {
        let beforeOpts = _.cloneDeep(this.state.customOpts)
        this.setState({
            customOpts: $.extend(true, this.state.customOpts, opts)
        }, function () {
            // 如果是历史记录，则附加到历史中
            if (_.isObject(historyInfo)) {
                let positionArray = []
                getPosition(this, positionArray)
                setTimeout(()=> {
                    historyAction.addHistory({
                        position: positionArray,
                        optsBefore: beforeOpts,
                        optsAfter: _.cloneDeep(this.state.customOpts),
                        type: 'update',
                        operateName: this.state.childProps.name + ' ' + historyInfo.name
                    })
                })
            }
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

        let newChilds = _.cloneDeep(this.state.childs)

        // 分配一个唯一key
        let uniqueKey = 0
        if (newChilds.length > 0) {
            uniqueKey = newChilds[newChilds.length - 1].uniqueKey + 1
        }

        // 添加子元素的属性
        let childInfo = {
            name: item.type,
            uniqueKey: uniqueKey,
            selected: item.edit ? item.edit.state.selected : false
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
        } else { // 否则为新增组件
            let positionArray = []
            getPosition(this, positionArray)
            positionArray.push(childInfo.uniqueKey)
            setTimeout(()=> {
                historyAction.addHistory({
                    position: positionArray,
                    uniqueKey: childInfo.uniqueKey,
                    componentName: childInfo.name,
                    type: 'add',
                    operateName: '新增组件 ' + childInfo.name
                })
            })
        }

        // 如果这个组件是新拖拽的万能矩形，不是最外层，则宽度设定为父级宽度的一半
        if (!item.edit && item.type === 'LayoutBox' && this.state.childProps.name !== 'Container') {
            let customWidth = this.state.customOpts && this.state.customOpts.base && this.state.customOpts.base.value.width
            let customHeight = this.state.customOpts && this.state.customOpts.base && this.state.customOpts.base.value.height

            let baseWidth = this.state.childProps.opts.base.value.width
            let parentWidth = customWidth || baseWidth

            let baseHeight = this.state.childProps.opts.base.value.height
            let parentHeight = customHeight || baseHeight

            // 获取拖拽父级的布局方式
            let parentFlexDirection = this.state.customOpts && this.state.customOpts.flex && this.state.customOpts.flex.value.flexDirection || 'row'

            childInfo.opts = $.extend(true, childInfo.opts, {
                base: {
                    value: {
                        width: parentFlexDirection === 'row' || parentFlexDirection === 'row-reverse' ? parentWidth / 2 : parentWidth,
                        height: parentFlexDirection === 'column' || parentFlexDirection === 'column-reverse' ? parentHeight / 2 : parentHeight
                    }
                }
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

    // 添加某个子元素（属性被定义好）
    addChild: function (props) {
        let newChilds = _.cloneDeep(this.state.childs)
        newChilds.push(props)
        this.setState({
            childs: newChilds
        })
    },

    removeChild: function (index) {
        let newChilds = _.cloneDeep(this.state.childs)
        _.pullAt(newChilds, index)

        this.setState({
            childs: newChilds
        })
    },

    removeSelf: function (isHistory) {
        if (isHistory) {
            let positionArray = []
            getPosition(this, positionArray)
            setTimeout(()=> {
                historyAction.addHistory({
                    position: positionArray,
                    optsBefore: _.cloneDeep(this.state.customOpts),
                    uniqueKey: this.props.uniqueKey,
                    componentName: this.state.childProps.name,
                    type: 'delete',
                    operateName: '删除组件 ' + this.state.childProps.name
                })
            })
        }
        this.props.parent.removeChild(this.props.index)
    },

    // 绝对定位拖拽元素属性变化
    onDragSourceAbsoluteChange: function (opts) {
        // 与customOpts作merge
        this.setState({
            customOpts: $.extend(true, this.state.customOpts, opts)
        }, function () {
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
        newChildProps.ref = (ref)=> {
            this.childInstance = ref
        }

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