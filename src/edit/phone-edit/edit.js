const React = require('react')
const ReactDOM = require('react-dom')
const DragSource = require('../toolbar/left/component/components/drag-source')
const DragSourceAbsolute = require('../toolbar/left/component/components/drag-source-absolute')
const DragTarget = require('./drag-target')
const editAction = require('../actions/edit-action')
const editStore = require('../stores/edit-store')
const footerAction = require('../actions/footer-action')
const historyAction = require('../actions/history-action')
const treeNodeAction = require('../actions/tree-node-action')
const treeAction = require('../actions/tree-action')
const classNames = require('classnames')
const _ = require('lodash')
const $ = require('jquery')
const getTree = require('./lib/get-tree')

const onDragMixins = require('./edit-mixins/on-drag')
const getPosition = require('./lib/get-position')

const Edit = React.createClass({
    mixins: [onDragMixins],

    getInitialState: function () {
        return {
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
        this.$dom = $(ReactDOM.findDOMNode(this))

        setTimeout(() => {
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
        this.treeNode.select()

        editAction.selectComponent(this)
    },

    // 触发修改子元素事件(由edit-store直接调用)
    updateSelf: function (opts, historyInfo) {
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
        }, function () {
            // 更新外部selector
            setTimeout(()=> {
                editAction.afterUpdateComponent()
            })
        })
    },

    // 开始被拖拽
    // 修改是否可以作为拖拽目标（当父级dragsource被拖动时，禁止子dragtarget生效）
    onChangeEnableTarget: function (isOk) {
        editAction.startDropComponent(this)

        // 如果组件被删除，取消更新
        if (!this.isMounted())return
    },

    // 添加某个子元素（属性被定义好）
    addChild: function (props) {
        let newChilds = _.cloneDeep(this.state.childs, function (value, name) {
            if (name === 'component' || name === 'childs') {
                return value
            }
        })
        newChilds.push(props)
        this.setState({
            childs: newChilds
        })
    },

    removeChild: function (index) {
        let newChilds = _.cloneDeep(this.state.childs, function (value, name) {
            if (name === 'component' || name === 'childs') {
                return value
            }
        })
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

        //// 右侧树删除节点
        this.treeNode.removeSelf()

        this.props.parent.removeChild(this.props.index)
    },

    onMouseOver: function (event) {
        event.stopPropagation()
        editAction.hoverComponent(this, this.$dom)
    },

    render: function () {
        // 记录render日志
        // console.log('%c[render] edit', 'color:green')
        let positionArray = []
        getPosition(this, positionArray)

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

        let childComponent = React.cloneElement(this.props.children, newChildProps)

        if (this.props.dragTarget) {
            childComponent = (
                <DragTarget onDrop={this.onDrop}
                            absolute={this.props.dragSourceAbsolute}
                            edit={this}
                            dragHover={this.onDragHover}>
                    {childComponent}
                </DragTarget>
            )
        }

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
        editStyle.minHeight = mergedStyle.minHeight
        // 继承子元素外边距
        editStyle.margin = mergedStyle.margin || null
        // 继承flex-grow
        editStyle.flexGrow = mergedStyle.flexGrow || null

        if (!editStyle.height && !editStyle.minHeight) {
            editStyle.height = 'inherit'
        }

        return (
            <div namespace
                 style={editStyle}
                 onMouseOver={this.onMouseOver}
                 onClick={this.onClick}>
                {childComponent}
            </div>
        )
    }
})

module.exports = Edit