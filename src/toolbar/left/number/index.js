var React = require('react')
var InputNumber = require('antd/lib/input-number')

module.exports = React.createClass({
    onChange: function (value) {
        this.props.item.value = value
        this.props.onChange && this.props.onChange(this.props.keyValue, this.props.item)
    },

    render: function () {
        return (
            <div className="ant-form-item">
                <label htmlFor="control-input"
                       className="col-6">{this.props.item.desc}</label>

                <div className="col-14">
                    <InputNumber type="text"
                                 value={this.props.item.value}
                                 onChange={this.onChange}
                                 className="ant-input"
                                 id="control-input"/>
                </div>
            </div>
        )
    }
})