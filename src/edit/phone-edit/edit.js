var React = require('react')
var DragSource = require('../toolbar/left/component/components/drag-source')
var DragSourceAbsolute = require('../toolbar/left/component/components/drag-source-absolute')
var DragTarget = require('./drag-target')
var editAction = require('../actions/edit-action')
var editStore = require('../stores/edit-store')
var footerAction = require('../actions/footer-action')
var historyAction = require('../actions/history-action')
var treeNodeAction = require('../actions/tree-node-action')
var treeAction = require('../actions/tree-action')
var classNames = require('classnames')
var _ = require('lodash')
var $ = require('jquery')
var getTree = require('./get-tree')

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
            customOpts: _.cloneDeep(this.props.opts),
            // 子元素属性数组
            childs: this.props.childs,
            selected: this.props.selected || false
        }
    },

    componentWillMount: function () {
        // 为每个子组件生成uniqueKey
        this.state.childs && this.state.childs.map((item)=> {
            item.uniqueKey = editStore.getUniqueKey()
        })
    },

    componentDidMount: function () {
        setTimeout(() => {
            footerAction.increaseInstanceNumber()
            //treeAction.editComponentMounted(this)
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

    shouldComponentUpdate: function (nextProps, nextState) {
        return nextState !== this.state
    },

    // 取消选择状态
    unSelected: function () {
        // 如果组件被删除，取消更新
        if (!this.isMounted())return

        // 取消选中状态
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

        // 触发右侧树选中
        //this.treeNode.select()

        editAction.selectComponent(this)
    },

    // 触发修改子元素事件(由edit-store直接调用)
    UpdateChildren: function (opts, historyInfo) {
        let mergeOpts = $.extend(true, _.cloneDeep(this.state.customOpts), opts)

        // 如果是历史记录，则附加到历史中
        if (_.isObject(historyInfo)) {
            let positionArray = []
            let optsBefore = _.cloneDeep(this.state.customOpts)
            let optsAfter = _.cloneDeep(mergeOpts)
            getPosition(this, positionArray)

            // 如果before为空，为了完全还原，需要记下原始状态信息
            if (_.isEmpty(optsBefore)) {
                optsBefore = _.cloneDeep(this.props.children.props.defaultOpts)
            }

            setTimeout(()=> {
                historyAction.addHistory({
                    position: positionArray,
                    optsBefore: optsBefore,
                    optsAfter: optsAfter,
                    type: 'update',
                    operateName: this.props.children.props.name + ' ' + historyInfo.name
                })
            })
        }

        this.setState({
            customOpts: mergeOpts
        })
    },

    // 修改是否可以作为拖拽目标（当父级dragsource被拖动时，禁止子dragtarget生效）
    onChangeEnableTarget: function (isOk) {
        // 如果组件被删除，取消更新
        if (!this.isMounted())return

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
            let info = {}
            getTree(this, info)
            setTimeout(()=> {
                historyAction.addHistory({
                    position: positionArray,
                    optsBefore: _.cloneDeep(this.state.customOpts),
                    childs: info.childs,
                    uniqueKey: this.props.uniqueKey,
                    componentName: this.props.children.props.name,
                    type: 'delete',
                    operateName: '删除组件 ' + this.props.children.props.name
                })
            })
        }

        this.props.parent.removeChild(this.props.index)
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
    },

    render: function () {
        // 记录render日志
        //let position = []
        //getPosition(this, position)
        //console.log('%c[render] edit:' + position.reverse(), 'color:green')

        let positionArray = []
        getPosition(this, positionArray)

        let className = classNames([
            {'selected': this.state.selected},
            {'absolute': this.props.dragSourceAbsolute}
        ])

        // 放在edit上的style
        let editStyle = {}

        // 给子元素传递的信息
        let newChildProps = {
            mode: 'edit',
            // 将edit本身传给子组件
            edit: this,
            // 将自定义属性与组件原本属性merge
            opts: this.state.customOpts,
            childs: this.state.childs,
            ref: (ref)=> {
                this.childInstance = ref
            }
        }

        let childComponent = (
            <div className={className}
                 onClick={this.onClick}>
                {React.cloneElement(this.props.children, newChildProps)}
            </div>
        )

        if (this.props.dragSource && !this.props.dragSourceAbsolute) {
            childComponent = (
                <DragSource onChangeEnableTarget={this.onChangeEnableTarget}
                            type={this.props.children.props.name}
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
            editStyle.position = 'absolute'
            editStyle.left = this.state.customOpts.position.value.left
            editStyle.top = this.state.customOpts.position.value.top
            childComponent = (
                <DragSourceAbsolute type={this.props.children.props.name}
                                    left={this.state.customOpts.position.value.left}
                                    top={this.state.customOpts.position.value.top}
                                    onChange={this.onDragSourceAbsoluteChange}
                                    edit={this}>
                    {childComponent}
                </DragSourceAbsolute>
            )
        }

        // style属性作merge
        let mergedStyle = $.extend(true, _.cloneDeep(this.props.children.props.defaultOpts.style.value), this.state.customOpts.style && this.state.customOpts.style.value)

        // 继承子元素宽高
        editStyle.width = mergedStyle.width
        editStyle.height = mergedStyle.height
        // 集成子元素外边距
        editStyle.margin = mergedStyle.margin || null

        return (
            <div namespace
                 style={editStyle}>
                {childComponent}
            </div>
        )
    }
})

module.exports = Edit