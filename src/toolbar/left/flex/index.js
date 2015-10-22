var React = require('react')
var Select = require('antd/lib/select')
var Option = Select.Option

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
            this.props.onChange(this.state.item)
        })
    },

    render: function () {
        return (
            <div>
                <h4>子元素布局</h4>

                <div className="ant-form-item">
                    <label htmlFor="control-input"
                           className="col-8">排列顺序</label>

                    <div className="col-14">
                        <Select value={this.state.item.value.flexDirection}
                                style={{width:'200px'}}
                                onChange={this.onChange.bind(this,'flexDirection')}>
                            <Option value="row">从左到右</Option>
                            <Option value="row-reverse">从右到左</Option>
                            <Option value="column">从上到下</Option>
                            <Option value="column-reverse">从下到上</Option>
                        </Select>
                    </div>
                </div>
                <div className="ant-form-item">
                    <label htmlFor="control-input"
                           className="col-8">换行规则</label>

                    <div className="col-14">
                        <Select value={this.state.item.value.flexWrap}
                                style={{width:'200px'}}
                                onChange={this.onChange.bind(this,'flexWrap')}>
                            <Option value="nowrap">不换行</Option>
                            <Option value="wrap">换行（换到下方）</Option>
                            <Option value="wrap-reverse">换行（换到上方）</Option>
                        </Select>
                    </div>
                </div>

                <div className="ant-form-item">
                    <label htmlFor="control-input"
                           className="col-8">主轴对齐方式</label>

                    <div className="col-14">
                        <Select value={this.state.item.value.justifyContent}
                                style={{width:'200px'}}
                                onChange={this.onChange.bind(this,'justifyContent')}>
                            <Option value="flex-start">左对齐</Option>
                            <Option value="flex-end">右对齐</Option>
                            <Option value="center">居中</Option>
                            <Option value="space-between">两端对齐</Option>
                            <Option value="space-around">等边距</Option>
                        </Select>
                    </div>
                </div>

                <div className="ant-form-item">
                    <label htmlFor="control-input"
                           className="col-8">交叉轴布局</label>

                    <div className="col-14">
                        <Select value={this.state.item.value.alignItems}
                                style={{width:'200px'}}
                                onChange={this.onChange.bind(this,'alignItems')}>
                            <Option value="flex-start">左对齐</Option>
                            <Option value="flex-end">右对齐</Option>
                            <Option value="center">居中</Option>
                            <Option value="baseline">第一行文字对齐</Option>
                            <Option value="stretch">拉伸</Option>
                        </Select>
                    </div>
                </div>
                <hr/>
            </div>
        )
    }
})