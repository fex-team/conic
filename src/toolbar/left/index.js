var React = require('react')
var Select = require('antd/lib/select')
var Option = Select.Option
var Checkbox = require('antd/lib/checkbox')
var Radio = require('antd/lib/radio')
var RadioGroup = require('antd/lib/radio/group')
var EnterAnimation = require('antd/lib/enter-animation')
var $ = require('jquery')
var editStore = require('../../stores/edit-store')
var editAction = require('../../actions/edit-action')
require('./index.scss')

module.exports = React.createClass({
    getInitialState: function () {
        return {
            // 当前选中组件的配置
            currentComponentOpts: {}
        }
    },

    _onChange: function () {
        let component = editStore.get()
        this.setState({
            currentComponentOpts: component && component.state.childOpts
        })
    },

    componentDidMount: function () {
        editStore.addChangeListener(this._onChange)
    },

    componentWillUnmount: function () {
        editStore.removeChangeListener(this._onChange)
    },

    onTextChange: function (key, event) {
        let opts = $.extend(true, {}, this.state.currentComponentOpts)
        opts[key].value = event.target.value

        this.setState({
            currentComponentOpts: opts
        }, function () {
            editAction.updateComponent(this.state.currentComponentOpts)
        })
    },

    render: function () {
        const animation = {
            enter: {
                type: 'bottom'
            }
        }

        let editForm
        if (!$.isEmptyObject(this.state.currentComponentOpts)) {
            // 解析编辑项目
            editForm = Object.keys(this.state.currentComponentOpts).map((key)=> {
                let item = this.state.currentComponentOpts[key]
                switch (item.edit) {
                case'text':
                    return (
                        <div key={key}
                             className="ant-form-item">
                            <label htmlFor="control-input"
                                   className="col-6">{item.desc}</label>

                            <div className="col-14">
                                <input type="text"
                                       value={item.value}
                                       onChange={this.onTextChange.bind(this,key)}
                                       className="ant-input"
                                       id="control-input"/>
                            </div>
                        </div>
                    )
                }
            })

            // 包装动画
            editForm = (
                <EnterAnimation component="form"
                                className="ant-form-horizontal"
                                enter={animation.enter}>
                    <div key="edit-form">
                        名字
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