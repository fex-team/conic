/**
 * @author dongtiancheng
 * @date 15/11/4.
 * @email dongtiancheng@baidu.com
 */

let React = require('react')
let classNames = require('classnames')
let pureRenderMixin = require('../../../components/mixins/pure-render')
let treeNodeAction = require('../../../actions/tree-node-action')
let treeNodeStore = require('../../../stores/tree-node-store')
let editAction = require('../../../actions/edit-action')

let selectType = null

let TreeNode = React.createClass({
    mixins: [pureRenderMixin],

    getInitialState: function () {
        return {
            childs: this.props.childs || [],
            expand: this.props.expand || false,
            selected: this.props.selected || false,
            hover: false
        }
    },

    componentWillMount: function () {
        //if (!_.isEmpty(this.props.childs)) {
        //    this.setState({
        //        childs: this.props.childs
        //    })
        //}
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({
            childs: nextProps.childs
        })
    },

    componentDidMount: function () {

        // 如果默认是选中状态，通知左侧组件更新
        if (this.props.selected) {
            setTimeout(()=> {
                treeNodeAction.selectItem(this)
            })
        }
    },

    showChildren: function (e) {
        e.preventDefault()
        e.stopPropagation()

        this.expand();
    },

    hideChildren: function (e) {
        e.preventDefault()
        e.stopPropagation()

        this.collapse()
    },

    expand: function () {
        if (this.state.expand || !this.isMounted()) return

        this.setState({
            expand: true
        })
    },

    collapse: function () {
        if (!this.state.expand || !this.isMounted()) return

        this.setState({
           expand: false
        })
    },

    onClick: function (e) {
        e.preventDefault()
        e.stopPropagation()

        this.select()

        this.props.component.clickAction()
    },

    onMouseOver: function (e) {
        e.preventDefault()
        e.stopPropagation()

        this.hover()
    },

    hover: function () {
        if (this.state.hover || this.props.name === '手机壳') {
            return
        }

        this.setState({
            hover: true
        })

        treeNodeAction.hoverItem(this)
        editAction.hoverComponent(this.props.component, this.props.component.$dom)
    },

    unHover: function () {
        if (!this.state.hover) {
            return
        }

        this.setState({
            hover: false
        })
    },

    select: function () {
        if (this.state.selected) {
            return;
        }

        this.setState({
            selected: true
        })

        treeNodeAction.selectItem(this)
    },

    unSelected: function () {
        if (!this.state.selected || !this.isMounted()) {
            return;
        }

        this.setState({
            selected: false
        })
    },

    removeSelf: function () {
        this.props.parent.removeChild(this.props.index)
    },

    removeChild: function (index) {
        let newChilds = _.cloneDeep(this.state.childs, function (value, name) {
            if (name === 'component') {
                return value
            }
        })

        _.pullAt(newChilds, index)

        this.setState({
            childs: newChilds
        })
    },

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

    render: function () {
        var expand = this.state.expand
        var angle
        var selected = this.state.selected
        var padding = this.props.padding
        var hover = this.state.hover

        var styles = {
            paddingLeft: (12 * padding) + 'px'
        }

        if (this.state.childs.length > 0) {
            if (expand) {
                angle = <i onClick={this.hideChildren} className="fa fa-angle-down"></i>
            }
            else {
                angle = <i onClick={this.showChildren} className="fa fa-angle-right"></i>
            }
        }

        let childNodes = this.state.childs.map((item, index) => {

            let childProps = {
                childs: item.childs || [],
                component: item.component,
                parent: this,
                name: item.name,
                padding: padding + 1,
                selected: item.selected,
                uniqueKey: item.uniqueKey,
                index: index,
                ref: (ref) => {
                    if (ref === null) return
                    item.component.treeNode = ref
                }
            }

            return (
                <div className="node" key={item.uniqueKey}>
                    <TreeNode {...childProps}></TreeNode>
                </div>
            )
        })

        return (
            <div>
                <div className="section">
                    <div style={styles}
                         className={classNames('section-inner', 'none-select', {selected: selected}, {hover: hover})}
                         onMouseOver={this.onMouseOver}
                         onClick={this.onClick}>
                        <span className="dropdown">{angle}</span>
                        <span className="section-name">{this.props.name}</span>
                    </div>
                    <div className={classNames('children', 'none-select', {'show': expand, 'hide': !expand})}>
                        {childNodes}
                    </div>
                </div>

            </div>
        )
    }
})


module.exports = TreeNode