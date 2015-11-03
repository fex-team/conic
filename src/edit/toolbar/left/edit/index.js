var React = require('react')
var Select = require('antd/lib/select')
var Option = Select.Option
var Checkbox = require('antd/lib/checkbox')
var Radio = require('antd/lib/radio')
var RadioGroup = require('antd/lib/radio/group')
var EnterAnimation = require('antd/lib/enter-animation')
var $ = require('jquery')
var _ = require('lodash')
var editStore = require('../../../stores/edit-store')
var editAction = require('../../../actions/edit-action')
require('./index.scss')

var Text = require('./text')
var Number = require('./number')
var Flex = require('./flex')
var Style = require('./style')
var Position = require('./position')

let currentComponentOpts = null
let currentComponentDesc = null

module.exports = React.createClass({
    getInitialState: function () {
        return {}
    },

    onComponentChange: function () {
        let component = editStore.get()
        if (component) {
            currentComponentDesc = component.state.childProps.desc || '未命名组件'
            currentComponentOpts = $.extend(true, _.cloneDeep(component.state.childProps.opts), component.state.customOpts)
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
        if (currentComponentOpts !== null) {
            // 解析编辑项目
            editForm = Object.keys(currentComponentOpts).map((key)=> {
                let item = currentComponentOpts[key]
                switch (item.edit) {
                case 'text':
                    return (
                        <Text key={key}
                              item={item}
                              onChange={this.onEditChange.bind(this,key)}/>
                    )

                case 'number':
                    return (
                        <Number key={key}
                                item={item}
                                onChange={this.onEditChange.bind(this,key)}/>
                    )

                case 'flex':
                    return (
                        <Flex key={key}
                              item={item}
                              onChange={this.onEditChange.bind(this,key)}/>
                    )

                case 'style':
                    return (
                        <Style key={key}
                               item={item}
                               onChange={this.onEditChange.bind(this,key)}/>
                    )
                case 'position':
                    return (
                        <Position key={key}
                                  item={item}
                                  onChange={this.onEditChange.bind(this,key)}/>
                    )
                }
            })

            // 包装动画
            editForm = (
                <EnterAnimation component="form"
                                className="ant-form-horizontal"
                                enter={animation.enter}>
                    <div key="edit-form">
                        <div className="component-name">
                            {currentComponentDesc === '手机壳' ? <div className="out-bg">手机壳</div> :
                                <div onClick={this.removeSelf}
                                     className="ant-btn ant-btn-danger title-button">
                                    <i className="fa fa-remove"
                                       style={{marginRight: 5}}></i>
                                    {currentComponentDesc}
                                </div>
                            }
                        </div>
                        {editForm}
                    </div>
                </EnterAnimation>
            )
        } else {
            editForm = (
                <EnterAnimation enter={animation.enter}>
                    <div key="empty"
                         className="nothing">
                        <div className="bold">编辑组件</div>

                        <div>请选中一个组件</div>
                    </div>
                </EnterAnimation>
            )
        }

        return (
            <div>
                {editForm}
            </div>
        )
    }
})