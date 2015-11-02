/**
 * @author dongtiancheng
 * @date 15/11/1.
 * @email dongtiancheng@baidu.com
 */
var React = require('react')
var Tree = require('antd/lib/tree')
var TreeNode = Tree.TreeNode
var _ = require('lodash')
var editStore = require('../../../stores/edit-store')
var treeStore = require('../../../stores/tree-store')
var classNames = require('classnames')

var Node = React.createClass({
    getInitialState: function () {
        return {
            name: this.props.name,
            childs: this.props.childs,
            childProps: this.props.children && _.cloneDeep(this.props.children.props),
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
        if (this.props.selected) {
            // TODO 触发选中
            //setTimeout(() => {
            //
            //})
        }
    },

    onClick: function () {

    },

    render: function () {
        var childElement

        var className = classNames([
            { 'selected': this.state.selected}
        ])

        // 是 root
        if (!this.props.children && !this.props.childProps) {
            let childs = this.state.childs.map((item) => {
                item.parent = this
                item.ref = (ref) => {
                    this.nodeInstance = ref
                }
                return <TreeNode title={item.name} ></TreeNode>
            })

            childElement = (
                <div className={className} onClick={this.onClick}>
                    {childs}
                </div>
            )
        }
        else {
            console.log(123)
            var newNodeProps = _.cloneDeep(this.props.childProps)
            newNodeProps.node = this
            newNodeProps.ref = (ref) => {
                this.nodeInstance = ref
            }

            childElement = (
                <div className={className}
                     onClick={this.onClick}>
                    {React.cloneElement(this.props.children, newNodeProps)}
                </div>
            )
        }


        return (
            <div>
                {childElement}
            </div>
        )
    }
})


module.exports = Node
