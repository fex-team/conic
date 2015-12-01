const React = require('react')
const Select = require('antd/lib/select')
const Codemirror = require('react-codemirror')
require('codemirror/mode/javascript/javascript')

const codeMirrorOpts = {
    lineNumbers: true,
    readOnly: false,
    mode: 'javascript',
    theme: 'material'
}

module.exports = React.createClass({
    getInitialState: function () {
        return {
            value: this.props.value
        }
    },

    componentWillReceiveProps: function (nextProps) {
        if (this.state.value !== nextProps.value) {
            this.setState({
                value: nextProps.value
            })
        }
    },

    onChange: function (value) {
        this.setState({
            value: value
        })
        this.props.onChange(value)
    },

    handleFocusChange: function (isFocus) {
        console.log(isFocus)
    },

    render: function () {
        return (
            <div className="ant-form-item">
                <label htmlFor="control-input"
                       className="col-8">{this.props.title}</label>

                <div className="col-14">
                    <Codemirror value={this.state.value}
                                onChange={this.onChange}
                                options={codeMirrorOpts}
                                onFocusChange={this.handleFocusChange}/>
                </div>
            </div>
        )
    }
})