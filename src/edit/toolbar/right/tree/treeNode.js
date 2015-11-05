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
            childrenExpand: false,
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

    componentWillReceiveProps: function (nextProps) {
        if (!_.isEmpty(nextProps.childs)) {
            this.setState({
                childs: nextProps.childs
            })
        }
    },

    onComponentChange: function () {
        var component = editStore.get()


    },

    showChildren: function (e) {
        e.preventDefault()
        e.stopPropagation()

        var childrenExpand = this.state.childrenExpand

        this.setState({
            childrenExpand: !childrenExpand
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

    render: function () {
        var childrenExpand = this.state.childrenExpand
        var angle
        var selected = this.state.selected
        var padding = this.props.padding

        var styles = {
            paddingLeft: (12 * padding) + 'px'
        }

        if (this.state.childs.length > 0) {
            if (childrenExpand) {
                angle = <i onClick={this.showChildren} className="fa fa-angle-down"></i>
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
                    <div className={classNames('children', 'none-select', {'show': childrenExpand, 'hide': !childrenExpand})}>
                        {childNodes}
                    </div>
                </div>

            </div>
        )
    }
})


module.exports = TreeNode