var React = require('react')
var editStore = require('../../stores/edit-store')
var classnames = require('classnames')
var iconMap = require('../top/component/icon-map')
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
        footerStore.removeChangeListener(this.onFooterOptsChange())
    },

    selectComponent: function (edit) {
        edit.clickAction()
    },

    render: function () {
        let arrows = this.state.editLists.map((item, index)=> {
            let className = classnames({
                arrow: true,
                active: index === this.state.editLists.length - 1
            })

            return (
                <div className={className}
                     key={index}
                     onClick={this.selectComponent.bind(this,item)}>
                    <i style={{marginRight:5}}
                       className={'fa fa-'+iconMap[item.state.childProps.name]}></i>{item.state.childProps.desc}
                </div>
            )
        })

        let instanceNumberClass = classnames({
            'instance-number': true,
            green: this.state.opts.instanceNumber < 100,
            warning: this.state.opts.instanceNumber >= 100 && this.state.opts.instanceNumber < 500,
            error: this.state.opts.instanceNumber > 500
        })

        return (
            <div>
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