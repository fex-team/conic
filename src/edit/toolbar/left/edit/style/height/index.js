const React = require('react')
const InputNumber = require('antd/lib/input-number')
const _ = require('lodash')
const classNames = require('classnames')
const Switch = require('antd/lib/switch')
require('./index.scss')

const normalWidth = 80

// 存储px/scale值
let cacheValue = {
    px: null,
    scale: null
}

// 判断当前宽度类型
function getType(value) {
    let type

    if (!_.isNumber(value)) {
        type = 'scale'
    }

    return type || 'px'
}

// 宽度转化为数字 100%
function widthToNumber(value) {
    if (_.isString(value)) {
        cacheValue.scale = _.parseInt(value.replace('%', ''))
        return cacheValue.scale
    } else {
        cacheValue.px = value
        return cacheValue.px
    }
}

module.exports = React.createClass({
    getInitialState: function () {
        return {
            value: widthToNumber(this.props.value),
            type: getType(this.props.value),
            canExtend: this.props.propKey === 'minHeight' ? true : false
        }
    },

    componentWillReceiveProps: function (nextProps) {
        if (this.state.value !== nextProps.value) {
            cacheValue = {
                px: null,
                scale: null
            }
            this.setState({
                value: widthToNumber(nextProps.value),
                type: getType(nextProps.value),
                canExtend: nextProps.propKey === 'minHeight' ? true : false
            })
        }
    },

    onChange: function (value) {
        cacheValue[this.state.type] = value
        this.changeParentOpts(this.state.type, value)
    },

    changeType: function (type) {
        let newValue = 0
        switch (type) {
        case 'px':
            newValue = cacheValue[type] || 100
            break
        case 'scale':
            newValue = cacheValue[type] || 50
            break
        }

        this.setState({
            type: type,
            value: newValue
        }, function () {
            this.changeParentOpts(this.state.type, this.state.value)
        })
    },

    changeParentOpts: function (type, value) {
        switch (this.state.type) {
        case 'px':
            if (this.state.canExtend) {
                this.props.onMinHeightChange(value)
            } else {
                this.props.onHeightChange(value)
            }
            break
        case 'scale':
            if (value > 100) {
                value = 100
            }
            this.setState({
                value: value
            }, function () {
                this.props.onHeightChange(value + '%')
            })
            break
        }
    },

    changeCanExtend: function (ok) {
        this.setState({
            canExtend: ok
        }, function () {
            this.changeParentOpts(this.state.type, this.state.value)
        })
    },

    render: function () {
        let pxClass = classNames({
            'mode-btn': true,
            'active': this.state.type === 'px'
        })
        let scaleClass = classNames({
            'mode-btn': true,
            'active': this.state.type === 'scale'
        })

        let canExtendClass = classNames({
            'mode-btn': true,
            'active': this.state.canExtend
        })
        let canNotExtendClass = classNames({
            'mode-btn': true,
            'active': !this.state.canExtend
        })

        return (
            <div className="_namespace">
                <div className="ant-form-item">
                    <label htmlFor="control-input"
                           className="col-8">高度</label>

                    <div className="col-16">
                        <div className="flex-center">
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
                        </div>
                        {this.state.type === 'px' ? <div className="flex-left">
                            <span style={{marginRight:5}}>可撑开</span>
                            <Switch checked={this.state.canExtend}
                                    onChange={this.changeCanExtend}/>
                        </div> : null}
                    </div>
                </div>
            </div>
        )
    }
})