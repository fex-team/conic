var React = require('react')
var DragSource = require('../toolbar/top/component/drag-source')
var DragTarget = require('./drag-target')
var editAction = require('../actions/edit-action')
var editStore = require('../stores/edit-store')
var classNames = require('classnames')

module.exports = React.createClass({
    getInitialState: function () {
        return {
            enabledTarget: true,
            childOpts: this.props.children && this.props.children.props.opts,
            selected: false
        }
    },

    _onChange: function () {
        // 如果不是自己，取消选择
        if (this !== editStore.get()) {
            this.setState({
                selected: false
            })
        }
    },

    componentDidMount: function () {
        editStore.addChangeListener(this._onChange)
    },

    componentWillUnmount: function () {
        editStore.removeChangeListener(this._onChange)
    },

    // 触发选择组件事件
    onClick: function (event) {
        this.setState({
            selected: true
        })
        event.stopPropagation()
        editAction.selectComponent(this)
    },

    // 触发修改子元素事件(由edit-action直接调用)
    UpdateChildren: function (opts) {
        this.setState({
            childOpts: opts
        })
    },

    // 修改是否可以作为拖拽目标（当父级dragsource被拖动时，禁止子dragtarget生效）
    onChangeEnableTarget: function (isOk) {
        this.setState({
            enabledTarget: isOk
        })
    },

    // 拖拽某个元素
    onDrop: function (container, item) {
        console.log(container, item)
    },

    render: function () {
        let className = classNames([
            {'selected': this.state.selected}
        ])
        let edit = (
            <div className={className}
                 onClick={this.onClick}>
                {React.cloneElement(this.props.children, {
                    opts: this.state.childOpts
                })}
            </div>
        )

        if (this.props.dragSource) {
            edit = (
                <DragSource onChangeEnableTarget={this.onChangeEnableTarget}>{edit}</DragSource>
            )
        }

        if (this.props.dragTarget) {
            edit = (
                <DragTarget enabledTarget={this.state.enabledTarget}
                            onDrop={this.onDrop}>{edit}</DragTarget>
            )
        }

        return (
            <div>
                {edit}
            </div>
        )
    }
})