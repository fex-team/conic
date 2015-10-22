var React = require('react')
var $ = require('jquery')
require('./index.scss')

// margin or padding 转换成4纬数字
function distanceToFourLatitude(str) {
    let top, right, bottom, left
    let arr = str.toString().split(' ')
    switch (arr.length) {
    case 1:
        top = right = bottom = left = arr[0]
        break
    case 2:
        top = bottom = arr[0]
        right = left = arr[1]
        break
    case 3:
        top = arr[0]
        right = left = arr[1]
        bottom = arr[2]
        break
    case 4:
        top = arr[0]
        right = arr[1]
        bottom = arr[2]
        left = arr[3]
        break
    }
    return {
        top: Number(top.replace(/px$/g, '')),
        right: Number(right.replace(/px$/g, '')),
        bottom: Number(bottom.replace(/px$/g, '')),
        left: Number(left.replace(/px$/g, ''))
    }
}

// 4纬数字转化为 margin or padding
function fourLatitudeToDistance(latitude) {
    return latitude.top + 'px ' + latitude.right + 'px ' + latitude.bottom + 'px ' + latitude.left + 'px'
}

module.exports = React.createClass({
    getInitialState: function () {
        let margin = distanceToFourLatitude(this.props.margin)
        let padding = distanceToFourLatitude(this.props.padding)
        return {
            // 当前选中组件名称
            currentType: null,
            currentDirection: null,
            clientX: 0,
            clientY: 0,
            margin,
            padding
        }
    },

    componentWillReceiveProps: function (nextProps) {
        let margin = distanceToFourLatitude(this.props.margin)
        let padding = distanceToFourLatitude(this.props.padding)

        if (this.state.margin !== margin || this.state.padding !== padding) {
            this.setState({
                margin,
                padding
            })
        }
    },

    componentDidMount: function () {
        $(document).bind('mouseup', ()=> {
            if (!this.state.currentType) {
                return
            }

            this.setState({
                currentType: null
            })
        })

        $(document).bind('mousemove', (e)=> {
            if (!this.state.currentType) {
                return
            }

            let offset
            if (this.state.currentDirection === 'left' || this.state.currentDirection === 'right') {
                offset = this.state.clientX - e.pageX
            } else {
                offset = this.state.clientY - e.pageY
            }

            let newType = this.state[this.state.currentType]
            newType[this.state.currentDirection] = offset + newType[this.state.currentDirection]
            if (newType[this.state.currentDirection] < 0) {
                newType[this.state.currentDirection] = 0
            }

            this.setState({
                clientX: e.pageX,
                clientY: e.pageY,
                [this.state.currentType]: newType
            })

            // 通知父级更新
            if (this.state.currentType === 'margin') {
                this.props.onChange('margin', fourLatitudeToDistance(this.state['margin']))
            } else {
                this.props.onChange('padding', fourLatitudeToDistance(this.state['padding']))
            }
        })
    },

    componentWillUnmount: function () {
        $(document).unbind('mouseup')
        $(document).unbind('mousemove')
    },

    onMouseDown: function (type, direction, event) {
        this.setState({
            currentType: type,
            currentDirection: direction,
            clientX: event.clientX,
            clientY: event.clientY
        })
    },

    render: function () {
        return (
            <div>
                <div className="ant-form-item">
                    <label className="col-8">内外边距</label>

                    <div className="col-14">
                        <div className="tool-box">
                            <div className="margin-top-box"
                                 onMouseDown={this.onMouseDown.bind(this,'margin','top')}>
                                <div className="margin-top"></div>
                            </div>
                            <span className="margin-top-label">{this.state.margin.top}</span>

                            <div className="padding-top-box"
                                 onMouseDown={this.onMouseDown.bind(this,'padding','top')}>
                                <div className="padding-top"></div>
                            </div>
                            <span className="padding-top-label">{this.state.padding.top}</span>

                            <div className="margin-right-box"
                                 onMouseDown={this.onMouseDown.bind(this,'margin','right')}>
                                <div className="margin-right"></div>
                            </div>
                            <span className="margin-right-label">{this.state.margin.right}</span>

                            <div className="padding-right-box"
                                 onMouseDown={this.onMouseDown.bind(this,'padding','right')}>
                                <div className="padding-right"></div>
                            </div>
                            <span className="padding-right-label">{this.state.padding.right}</span>

                            <div className="margin-bottom-box"
                                 onMouseDown={this.onMouseDown.bind(this,'margin','bottom')}>
                                <div className="margin-bottom"></div>
                            </div>
                            <span className="margin-bottom-label">{this.state.margin.bottom}</span>

                            <div className="padding-bottom-box"
                                 onMouseDown={this.onMouseDown.bind(this,'padding','bottom')}>
                                <div className="padding-bottom"></div>
                            </div>
                            <span className="padding-bottom-label">{this.state.padding.bottom}</span>

                            <div className="margin-left-box"
                                 onMouseDown={this.onMouseDown.bind(this,'margin','left')}>
                                <div className="margin-left"></div>
                            </div>
                            <span className="margin-left-label">{this.state.margin.left}</span>

                            <div className="padding-left-box"
                                 onMouseDown={this.onMouseDown.bind(this,'padding','left')}>
                                <div className="padding-left"></div>
                            </div>
                            <span className="padding-left-label">{this.state.padding.left}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})