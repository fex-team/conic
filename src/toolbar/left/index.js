var React = require('react')
var Select = require('antd/lib/select')
var Option = Select.Option
var Checkbox = require('antd/lib/checkbox')
var Radio = require('antd/lib/radio')
var RadioGroup = require('antd/lib/radio/group')
var EnterAnimation = require('antd/lib/enter-animation')
var $ = require('jquery')
var _ = require('lodash')
var editStore = require('../../stores/edit-store')
var editAction = require('../../actions/edit-action')
require('./index.scss')

var Text = require('./text')
var Number = require('./number')
var Flex = require('./flex')
var Style = require('./style')

let currentComponentProps

module.exports = React.createClass({
    getInitialState: function () {
        return {}
    },

    _onComponentChange: function () {
        let component = editStore.get()
        currentComponentProps = component && _.cloneDeep(component.state.childProps)
        this.forceUpdate()
    },

    componentDidMount: function () {
        editStore.addChangeListener(this._onComponentChange)
    },

    componentWillUnmount: function () {
        editStore.removeChangeListener(this._onComponentChange)
    },

    onEditChange: function (key, item) {
        currentComponentProps.opts[key] = item
        editAction.updateComponent(currentComponentProps)
    },

    render: function () {
        const animation = {
            enter: {
                type: 'bottom'
            }
        }

        let editForm
        if (!$.isEmptyObject(currentComponentProps) && currentComponentProps.opts) {
            // 解析编辑项目
            editForm = Object.keys(currentComponentProps.opts).map((key)=> {
                let item = currentComponentProps.opts[key]
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
                }
            })

            // 包装动画
            editForm = (
                <EnterAnimation component="form"
                                className="ant-form-horizontal"
                                enter={animation.enter}>
                    <div key="edit-form">
                        <div className="component-name">{currentComponentProps.desc}</div>
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