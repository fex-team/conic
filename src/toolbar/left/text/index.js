var React = require('react')

module.exports = React.createClass({
    onChange: function (key, value) {
        this.props.item.value[key] = value
        this.props.onChange && this.props.onChange(this.props.key, this.props.item)
    },

    render: function () {
        return (
            <div className="ant-form-item">
                <label htmlFor="control-input"
                       className="col-6">{this.props.item.desc}</label>

                <div className="col-14">
                    <input type="text"
                           value={this.props.item.value}
                           onChange={this.props.onChange}
                           className="ant-input"
                           id="control-input"/>
                </div>
            </div>
        )
    }
})