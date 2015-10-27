const React = require('react')
const InputNumber = require('antd/lib/input-number')

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

    onChange: function (key, event) {
        let newItem = this.state.item
        if (typeof event === 'object') {
            newItem.value[key] = event.target.value
        } else {
            newItem.value[key] = event
        }

        this.props.onChange(this.state.item)
    },

    render: function () {
        let forms = Object.keys(this.state.item.value).map((key)=> {
            var value = this.state.item.value[key]
            switch (key) {
            case 'left':
                return (
                    <div key={key}
                         className="ant-form-item">
                        <label htmlFor="control-input"
                               className="col-8">x</label>

                        <div className="col-14">
                            <InputNumber
                                type="text"
                                value={value}
                                style={{width:200}}
                                onChange={this.onChange.bind(this,key)}
                                className="ant-input"
                                id="control-input"/>
                        </div>
                    </div>
                )
            case 'top':
                return (
                    <div key={key}
                         className="ant-form-item">
                        <label htmlFor="control-input"
                               className="col-8">y</label>

                        <div className="col-14">
                            <InputNumber
                                type="text"
                                value={value}
                                style={{width:200}}
                                onChange={this.onChange.bind(this,key)}
                                className="ant-input"
                                id="control-input"/>
                        </div>
                    </div>
                )
            }
        })
        return (
            <div>
                <h4>位置</h4>
                {forms}
            </div>
        )
    }
})