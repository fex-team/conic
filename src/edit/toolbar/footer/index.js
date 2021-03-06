var React = require('react')
var editStore = require('../../stores/edit-store')
var classNames = require('classnames')
var iconMap = require('../left/component/components/icon-map')
var footerStore = require('../../stores/footer-store')
var Tooltip = require('antd/lib/tooltip')
require('./index.scss')

let editLists = []

function getParent(edit) {
    if (!edit) {
        return
    }

    editLists.unshift(edit)

    if (!edit.props.parent) {
        return
    }
    getParent(edit.props.parent)
}

module.exports = React.createClass({
    getInitialState: function () {
        return {
            editLists: [],
            opts: footerStore.get()
        }
    },

    onComponentChange: function () {
        // 获得所有父级直到根目录
        editLists = []
        getParent(editStore.get())
        this.setState({
            editLists: editLists
        })
    },

    onFooterOptsChange: function (opts) {
        this.setState({
            opts: footerStore.get()
        })
    },

    componentDidMount: function () {
        editStore.addChangeListener(this.onComponentChange)
        footerStore.addChangeListener(this.onFooterOptsChange)
    },

    componentWillUnmount: function () {
        editStore.removeChangeListener(this.onComponentChange)
        footerStore.removeChangeListener(this.onFooterOptsChange)
    },

    selectComponent: function (edit) {
        edit.clickAction()
    },

    render: function () {
        let arrows = this.state.editLists.map((item, index)=> {
            let className = classNames({
                arrow: true,
                active: index === this.state.editLists.length - 1
            })

            return (
                <div className={className}
                     key={index}
                     onClick={this.selectComponent.bind(this,item)}>
                    <i style={{marginRight:5}}
                       className={'fa fa-'+iconMap[item.props.children.props.name]}></i>{item.props.children.props.desc}
                </div>
            )
        })

        let instanceNumberClass = classNames({
            'instance-number': true,
            green: this.state.opts.instanceNumber < 100,
            warning: this.state.opts.instanceNumber >= 100 && this.state.opts.instanceNumber < 500,
            error: this.state.opts.instanceNumber > 500
        })

        return (
            <div className="_namespace">
                <div className="layout">
                    <div className="footer-tree">
                        {arrows}
                    </div>
                    <div className="right">
                        <div className="info">
                            <Tooltip title="当前页面组件实例总数，每个页面保持在500以内，可以保证流畅编辑状态">
                                <span className={instanceNumberClass}>
                                    <i style={{marginRight:5}}
                                       className="fa fa-cube"></i>
                                    {this.state.opts.instanceNumber}
                                </span>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})