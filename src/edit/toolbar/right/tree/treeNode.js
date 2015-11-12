/**
 * @author dongtiancheng
 * @date 15/11/4.
 * @email dongtiancheng@baidu.com
 */

let React = require('react')
let classNames = require('classnames')
let pureRenderMixin = require('../../../components/mixins/pureRenderMixin')
let treeNodeAction = require('../../../actions/tree-node-action')
let treeNodeStore = require('../../../stores/tree-node-store')

let selectType = null

let TreeNode = React.createClass({
    mixins: [pureRenderMixin],

    getInitialState: function () {
        return {
            childs: [],
            expand: false,
            selected: false
        }
    },

    componentWillMount: function () {
        if (!_.isEmpty(this.props.childs)) {
            this.setState({
                childs: this.props.childs
            })
        }
    },

    componentDidMount: function () {
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
        if (this.state.expand) return

        this.setState({
            expand: true
        })
    },

    collapse: function () {
        if (!this.state.expand) return

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
            if (name === 'component') {
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
                index: index,
                ref: (ref) => {
                    if (ref === null) return
                    item.component.treeNode = ref
                }
            }

            return (
                <div className="node" key={index}>
                    <TreeNode {...childProps}></TreeNode>
                </div>
            )
        })

        return (
            <div>
                <div className="section">
                    <div style={styles} className={classNames('section-inner', 'none-select', {selected: selected})} onClick={this.onClick}>
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