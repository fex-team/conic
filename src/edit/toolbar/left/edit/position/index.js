const React = require('react')
const InputNumber = require('antd/lib/input-number')

const normalWidth = 150

module.exports = React.createClass({
    getInitialState: function () {
        return {
            item: this.props.item
        }
    },

    // 同步拖拽位移带来的修改
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

        this.props.onChange(newItem, {
            name: '移动'
        })
    },

    render: function () {
        let forms = Object.keys(this.state.item.value).map((key)=> {
            var value = this.state.item.value[key]
            switch (key) {
            case 'left':
                return (
                    <div key={key}
                         className="ant-form-item">
                        <label htmlFor="style-position-left"
                               className="col-8">x（距左侧）</label>

                        <div className="col-16">
                            <InputNumber
                                type="text"
                                value={value}
                                style={{width:normalWidth}}
                                onChange={this.onChange.bind(this,key)}
                                className="ant-input"
                                id="style-position-left"/>
                        </div>
                    </div>
                )
            case 'top':
                return (
                    <div key={key}
                         className="ant-form-item">
                        <label htmlFor="style-position-top"
                               className="col-8">y（距顶部）</label>

                        <div className="col-16">
                            <InputNumber
                                type="text"
                                value={value}
                                style={{width:normalWidth}}
                                onChange={this.onChange.bind(this,key)}
                                className="ant-input"
                                id="style-position-top"/>
                        </div>
                    </div>
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