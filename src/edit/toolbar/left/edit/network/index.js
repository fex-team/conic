const React = require('react')
const Select = require('antd/lib/select')
const Option = Select.Option
const Switch = require('antd/lib/switch')
const Json = require('../lib/json')

const selectWidth = 150

module.exports = React.createClass({
    getInitialState: function () {
        return {
            item: this.props.item
        }
    },

    componentWillReceiveProps: function (nextProps) {
        if (this.state.item !== nextProps.item) {
            this.setState({
                item: nextProps.item
            })
        }
    },

    onChange: function (key, value) {
        let newItem = this.state.item
        newItem.value[key] = value

        this.setState({
            item: newItem
        }, function () {
            this.props.onChange(this.state.item, {
                name: '修改网络配置'
            })
        })
    },

    render: function () {
        return (
            <div className="ant-form-horizontal">
                <div className="ant-form-item">
                    <label htmlFor="control-input"
                           className="col-8">触发条件</label>

                    <div className="col-14">
                        <Select value={this.state.item.value.trigger}
                                style={{width:selectWidth}}
                                onChange={this.onChange.bind(this,'trigger')}>
                            <Option value="init">初始化</Option>
                            <Option value="event">事件</Option>
                        </Select>
                    </div>
                </div>

                <div className="ant-form-item">
                    <label htmlFor="control-input"
                           className="col-8">请求地址</label>

                    <div className="col-14">
                        <input type="text"
                               value={this.state.item.value.url}
                               onChange={this.onChange}
                               className="ant-input"
                               id="control-input"/>
                    </div>
                </div>

                <div className="ant-form-item">
                    <label htmlFor="control-input"
                           className="col-8">模拟请求</label>

                    <div className="col-14">
                        <Switch checked={this.state.item.value.mock}
                                onChange={this.onChange.bind(this,'mock')}/>
                    </div>
                </div>

                {this.state.item.value.mock ?
                    <Json title="响应内容"/>
                    : null}
            </div>
        )
    }
})