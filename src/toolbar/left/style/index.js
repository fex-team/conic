var React = require('react')
var Select = require('antd/lib/select')
var InputNumber = require('antd/lib/input-number')
var Color = require('../lib/color')
var Option = Select.Option

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
                               className="col-6">宽度</label>

                        <div className="col-14">
                            <InputNumber type="text"
                                         value={value}
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
                               className="col-6">高度</label>

                        <div className="col-14">
                            <InputNumber type="text"
                                         value={value}
                                         onChange={this.onChange.bind(this,key)}
                                         className="ant-input"
                                         id="control-input"/>
                        </div>
                    </div>
                )
            case 'color':
                return (
                    <div key={key}
                         className="ant-form-item">
                        <label htmlFor="control-input"
                               className="col-6">字体颜色</label>

                        <div className="col-14">
                            <Color value={value} onChange={this.onChange.bind(this,key)}/>
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