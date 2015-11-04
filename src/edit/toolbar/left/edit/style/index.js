const React = require('react')
const Select = require('antd/lib/select')
const InputNumber = require('antd/lib/input-number')
const Color = require('../lib/color')
const Option = Select.Option
const Background = require('./background')
const MarginPadding = require('./margin-padding')

const normalWidth = 180

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

    onChange: function (key, value, historyInfo) {
        let newItem = this.state.item
        newItem.value[key] = value
        this.props.onChange(newItem, historyInfo)
    },

    onWidthChange: function (key, value) {
        let newItem = this.state.item
        newItem.value[key] = value
        this.props.onChange(newItem, {
            name: `宽度改为 ${value}`
        })
    },

    onHeightChange: function (key, value) {
        let newItem = this.state.item
        newItem.value[key] = value
        this.props.onChange(newItem, {
            name: `高度改为 ${value}`
        })
    },

    onFontSizeChange: function (key, value) {
        let newItem = this.state.item
        newItem.value[key] = value
        this.props.onChange(newItem, {
            name: `字体大小改为 ${value}`
        })
    },

    onFontColorChange: function (key, value, finish) {
        let newItem = this.state.item
        newItem.value[key] = value
        if (!finish) {
            this.props.onChange(newItem, null)
        } else {
            this.props.onChange(newItem, {
                name: `字体颜色改为 ${value}`
            })
        }
    },

    onBgColorChange: function (key, value, finish) {
        let newItem = this.state.item
        newItem.value[key] = value
        if (!finish) {
            this.props.onChange(newItem, null)
        } else {
            this.props.onChange(newItem, {
                name: `背景颜色改为 ${value}`
            })
        }
    },

    render: function () {
        let forms = Object.keys(this.state.item.value).map((key)=> {
            var value = this.state.item.value[key]

            switch (key) {
            case 'width':
                return (
                    <div key={key}
                         className="ant-form-item">
                        <label htmlFor="control-input"
                               className="col-8">宽度</label>

                        <div className="col-16">
                            <InputNumber
                                type="text"
                                value={value}
                                style={{width:normalWidth}}
                                onChange={this.onWidthChange.bind(this,key)}
                                className="ant-input"
                                id="control-input"/>
                        </div>
                    </div>
                )
            case 'height':
                return (
                    <div key={key}
                         className="ant-form-item">
                        <label htmlFor="control-input"
                               className="col-8">高度</label>

                        <div className="col-16">
                            <InputNumber type="text"
                                         value={value}
                                         style={{width:normalWidth}}
                                         onChange={this.onHeightChange.bind(this,key)}
                                         className="ant-input"
                                         id="control-input"/>
                        </div>
                    </div>
                )
            case 'fontSize':
                return (
                    <div key={key}
                         className="ant-form-item">
                        <label htmlFor="control-input"
                               className="col-8">字体大小</label>

                        <div className="col-16">
                            <InputNumber type="text"
                                         value={value}
                                         style={{width:normalWidth}}
                                         onChange={this.onFontSizeChange.bind(this,key)}
                                         className="ant-input"
                                         id="control-input"/>
                        </div>
                    </div>
                )
            case 'background':
                return (
                    <Background key={key}
                                propKey={key}
                                value={value}
                                onChange={this.onBgColorChange.bind(this,key)}/>
                )
            case 'color':
                return (
                    <div key={key}
                         className="ant-form-item">
                        <label htmlFor="control-input"
                               className="col-8">字体颜色</label>

                        <div className="col-16">
                            <Color value={value}
                                   onChange={this.onFontColorChange.bind(this,key)}/>
                        </div>
                    </div>
                )
            case 'margin':
                return (
                    <MarginPadding key={key}
                                   margin={this.state.item.value['margin']}
                                   padding={this.state.item.value['padding']}
                                   onChange={this.onChange}/>
                )
            }
        })
        return (
            <div className="ant-form-horizontal">
                {forms}
            </div>
        )
    }
})