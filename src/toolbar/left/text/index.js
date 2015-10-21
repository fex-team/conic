var React = require('react')

module.exports = React.createClass({
    onChange: function (event) {
        this.props.item.value = event.target.value
        this.props.onChange && this.props.onChange(this.props.keyValue, this.props.item)
    },

    render: function () {
        return (
            <div className="ant-form-item">
                <label htmlFor="control-input"
                       className="col-8">{this.props.item.desc}</label>

                <div className="col-14">
                    <input type="text"
                           value={this.props.item.value}
                           onChange={this.onChange}
                           className="ant-input"
                           id="control-input"/>
                </div>
            </div>
        )
    }
})