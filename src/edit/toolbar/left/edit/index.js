const React = require('react')
const Select = require('antd/lib/select')
const Option = Select.Option
const Checkbox = require('antd/lib/checkbox')
const Radio = require('antd/lib/radio')
const RadioGroup = require('antd/lib/radio/group')
const $ = require('jquery')
const _ = require('lodash')
const editStore = require('../../../stores/edit-store')
const editAction = require('../../../actions/edit-action')
const Collapse = require('antd/lib/collapse')
const Panel = Collapse.Panel
require('./index.scss')

const Custom = require('./custom')
const Flex = require('./flex')
const Style = require('./style')
const Position = require('./position')

let currentComponentOpts = null
let currentComponentDesc = null

module.exports = React.createClass({
    getInitialState: function () {
        return {}
    },

    onComponentChange: function () {
        let component = editStore.get()
        if (component) {
            currentComponentDesc = component.props.children.props.desc || '未命名组件'
            currentComponentOpts = $.extend(true, _.cloneDeep(component.props.children.props.defaultOpts), _.cloneDeep(component.state.customOpts))
        } else {
            currentComponentOpts = currentComponentDesc = null
        }
        this.forceUpdate()
    },

    componentDidMount: function () {
        editStore.addChangeListener(this.onComponentChange)
    },

    componentWillUnmount: function () {
        editStore.removeChangeListener(this.onComponentChange)
    },

    onEditChange: function (key, value, historyInfo) {
        let opts = {
            [key]: value
        }
        editAction.updateComponent(opts, historyInfo)
    },

    removeSelf: function () {
        editAction.removeCurrent()
        currentComponentOpts = null
        this.forceUpdate()
    },

    render: function () {
        const animation = {
            enter: {
                type: 'bottom'
            }
        }

        let editForm
        let collapseDefaultActiveKeys = []

        if (currentComponentOpts !== null) {
            // 解析编辑项目
            editForm = Object.keys(currentComponentOpts).map((key, index)=> {
                collapseDefaultActiveKeys.push(index.toString())

                let item = currentComponentOpts[key]
                switch (item.edit) {
                case 'custom':
                    return (
                        <Panel header={item.title}
                               key={index}>
                            <Custom item={item.value}
                                    onChange={this.onEditChange.bind(this,key)}/>
                        </Panel>
                    )
                    break

                case 'flex':
                    return (
                        <Panel header={`子元素布局`}
                               key={index}>
                            <Flex item={item}
                                  onChange={this.onEditChange.bind(this,key)}/>
                        </Panel>
                    )

                case 'style':
                    return (
                        <Panel header={`样式`}
                               key={index}>
                            <Style item={item}
                                   onChange={this.onEditChange.bind(this,key)}/>
                        </Panel>
                    )
                case 'position':
                    return (
                        <Panel header={`位置`}
                               key={index}>
                            <Position item={item}
                                      onChange={this.onEditChange.bind(this,key)}/>
                        </Panel>
                    )
                }
            })

            // 包装动画
            editForm = (
                <div key="edit-form">
                    <div className="component-name">
                        {currentComponentDesc === '手机壳' ?
                            <div className="out-bg"><i className="fa fa-cube"
                                                       style={{marginRight:5}}></i>手机壳
                            </div> :
                            <div onClick={this.removeSelf}
                                 className="delete-btn">
                                <i className="fa fa-cube"
                                   style={{marginRight:5}}></i>
                                {currentComponentDesc}
                                <i className="fa fa-remove"
                                   style={{marginLeft: 5}}></i>
                            </div>
                        }
                    </div>
                    <Collapse defaultActiveKey={collapseDefaultActiveKeys}>
                        {editForm}
                    </Collapse>
                </div>
            )
        } else {
            editForm = (
                <div key="empty"
                     className="nothing">
                    <div className="bold">编辑组件</div>

                    <div>请选中一个组件</div>
                </div>
            )
        }

        return (
            <div namespace>
                {editForm}
            </div>
        )
    }
})