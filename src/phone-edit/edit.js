var React = require('react')
var DragSource = require('../toolbar/top/component/drag-source')
var DragTarget = require('./drag-target')
var editAction = require('../actions/edit-action')
var editStore = require('../stores/edit-store')
var classNames = require('classnames')
var $ = require('jquery')

const Edit = React.createClass({
    getDefaultProps: function () {
        return {
            name: 'edit',
            desc: '编辑组件',
            opts: {
                
            }
        }
    },

    getInitialState: function () {
        return {
            enabledTarget: true,
            childProps: this.props.children && $.extend(true, {}, this.props.children.props),
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
        event.stopPropagation()
        this.setState({
            selected: true
        })
        editAction.selectComponent(this)
    },

    // 触发修改子元素事件(由edit-action直接调用)
    UpdateChildren: function (props) {
        this.setState({
            childProps: props
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
                {React.cloneElement(this.props.children, this.state.childProps)}
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

module.exports = Edit