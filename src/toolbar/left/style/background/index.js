var React = require('react')
var Color = require('../../lib/color')
var Upload = require('../../lib/upload')
var Select = require('antd/lib/select')
var historyAction = require('../../../../actions/history-action')
var editStore = require('../../../../stores/edit-store')

module.exports = React.createClass({
    getInitialState: function () {
        return {
            bgType: 'color'
        }
    },

    onChangeType: function (value) {
        this.setState({
            bgType: value
        })
    },

    shouldComponentUpdate: function () {
        // 根据字符串判断类型
        if (this.props.value.indexOf('http') > -1 && this.state.bgType !== 'image') {
            this.setState({
                bgType: 'image'
            })
        } else if (this.state.bgType !== 'color') {
            this.setState({
                bgType: 'color'
            })
        }
        return true
    },

    onChange: function (key, value) {
        this.props.onChange(key, value, null)
    },

    onChangeComplete: function (key, value) {
        this.props.onChange(key, value, {name: '修改背景颜色'})
    },

    render: function () {
        let bgComponent
        switch (this.state.bgType) {
        case 'color':
            bgComponent = (
                <Color value={this.props.value}
                       onChangeComplete={this.onChangeComplete}
                       onChange={this.onChange}/>
            )
            break
        case 'image':
            bgComponent = (
                <Upload/>
            )
            break
        }

        return (
            <div>
                <div className="ant-form-item">
                    <label className="col-8"
                           style={{padding:'0 6px 0 0'}}>
                        <Select value={this.state.bgType}
                                style={{width:100}}
                                onChange={this.onChangeType}>
                            <Option value="color">背景颜色</Option>
                            <Option value="image">背景图片</Option>
                        </Select>
                    </label>

                    <div className="col-14">
                        {bgComponent}
                    </div>
                </div>
            </div>
        )
    }
})