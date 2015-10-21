var React = require('react')
var Select = require('antd/lib/select')
var InputNumber = require('antd/lib/input-number')
var Color = require('../lib/color')
var Option = Select.Option
var Background = require('./background')

module.exports = React.createClass({
    onChange: function (key, event) {
        if (typeof event === 'object') {
            this.props.item.value[key] = event.target.value
        } else {
            this.props.item.value[key] = event
        }
        this.props.onChange && this.props.onChange(this.props.keyValue, this.props.item)
    },

    render: function () {
        let forms = Object.keys(this.props.item.value).map((key)=> {
            var value = this.props.item.value[key]

            switch (key) {
            case 'width':
                return (
                    <div key={key}
                         className="ant-form-item">
                        <label htmlFor="control-input"
                               className="col-8">宽度</label>

                        <div className="col-14">
                            <InputNumber type="text"
                                         value={value}
                                         style={{width:200}}
                                         onChange={this.onChange.bind(this,key)}
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

                        <div className="col-14">
                            <InputNumber type="text"
                                         value={value}
                                         style={{width:200}}
                                         onChange={this.onChange.bind(this,key)}
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

                        <div className="col-14">
                            <InputNumber type="text"
                                         value={value}
                                         style={{width:200}}
                                         onChange={this.onChange.bind(this,key)}
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
                                onChange={this.onChange}/>
                )
            case 'color':
                return (
                    <div key={key}
                         className="ant-form-item">
                        <label htmlFor="control-input"
                               className="col-8">字体颜色</label>

                        <div className="col-14">
                            <Color value={value}
                                   onChange={this.onChange.bind(this,key)}/>
                        </div>
                    </div>
                )
            case 'margin':
                return (
                    <div key={key}
                         className="ant-form-item">
                        <label htmlFor="control-input"
                               className="col-8">外边距</label>

                        <div className="col-14">
                            123123
                        </div>
                    </div>
                )
            }
        })
        return (
            <div>
                <h4>样式</h4>
                {forms}
                <hr/>
            </div>
        )
    }
})