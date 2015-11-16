const React = require('react')
const InputNumber = require('antd/lib/input-number')
const _ = require('lodash')
const classnames = require('classnames')
require('./index.scss')

const normalWidth = 80

// 判断当前宽度类型
function getType(allStyle, value) {
    let type

    if (!_.isNumber(value)) {
        type = 'scale'
    }

    if (allStyle.flexGrow) {
        type = 'auto'
    }

    return type || 'px'
}

// 宽度转化为数字 100%
function widthToNumber(allStyle, value) {
    if (allStyle.flexGrow)return value

}

module.exports = React.createClass({
    getInitialState: function () {
        return {
            value: widthToNumber(this.props.allStyle, this.props.value),
            type: getType(this.props.allStyle, this.props.value)
        }
    },

    componentWillReceiveProps: function (nextProps) {
        if (this.state.value !== nextProps.value) {
            this.setState({
                value: widthToNumber(nextProps.allStyle, nextProps.value),
                type: getType(nextProps.allStyle, nextProps.value)
            })
        }
    },

    onChange: function (value) {
        this.props.onChange(value)
    },

    changeType: function (type) {
        this.setState({
            type: type
        })
    },

    render: function () {
        let pxClass = classnames({
            'mode-btn': true,
            'active': this.state.type === 'px'
        })
        let scaleClass = classnames({
            'mode-btn': true,
            'active': this.state.type === 'scale'
        })
        let autoClass = classnames({
            'mode-btn': true,
            'active': this.state.type === 'auto'
        })

        return (
            <div namespace>
                <div className="ant-form-item">
                    <label htmlFor="control-input"
                           className="col-8">宽度</label>

                    <div className="col-16 flex-center">
                        <InputNumber
                            type="text"
                            value={this.state.value}
                            style={{width:normalWidth}}
                            onChange={this.onChange}
                            className="ant-input"
                            id="control-input"/>

                        <div style={{marginLeft:3}}
                             className={pxClass}
                             onClick={this.changeType.bind(this,'px')}>PX
                        </div>
                        <div style={{borderLeft:'none'}}
                             className={scaleClass}
                             onClick={this.changeType.bind(this,'scale')}>%
                        </div>
                        <div style={{borderLeft:'none'}}
                             className={autoClass}
                             onClick={this.changeType.bind(this,'auto')}>AUTO
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})