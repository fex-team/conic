var React = require('react')
var $ = require('jquery')
var classnames = require('classnames')
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
        let margin = distanceToFourLatitude(nextProps.margin)
        let padding = distanceToFourLatitude(nextProps.padding)

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

            document.body.style.cursor = 'default'
            this.setState({
                currentType: null
            })

            // 通知父级
            //this.props.onChange('no', 123, {
            //    name: '随便通知一下'
            //})
        })

        $(document).bind('mousemove', (e)=> {
            if (!this.state.currentType) {
                return
            }

            let offset
            if (this.state.currentDirection === 'left' || this.state.currentDirection === 'right') {
                offset = this.state.clientX - e.pageX
                document.body.style.cursor = 'ew-resize'
            } else {
                offset = this.state.clientY - e.pageY
                document.body.style.cursor = 'ns-resize'
            }

            let newType = this.state[this.state.currentType]
            if (this.state.currentDirection === 'top' || this.state.currentDirection === 'left') {
                newType[this.state.currentDirection] = offset + newType[this.state.currentDirection]
            } else {
                newType[this.state.currentDirection] = -offset + newType[this.state.currentDirection]
            }

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
                this.props.onChange('margin', fourLatitudeToDistance(this.state['margin']), null)
            } else {
                this.props.onChange('padding', fourLatitudeToDistance(this.state['padding']), null)
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
        let types = ['margin', 'padding']
        let directions = ['top', 'right', 'bottom', 'left']

        let buttons = types.map((type)=> {
            return directions.map((direction)=> {
                let buttonClass = classnames({
                    [type + '-' + direction]: true,
                    active: this.state.currentType === type && this.state.currentDirection === direction
                })
                return (
                    <div key={type+direction}>
                        <div className={type + '-' + direction + '-box'}
                             onMouseDown={this.onMouseDown.bind(this,type,direction)}>
                            <div className={buttonClass}></div>
                        </div>
                        <span className={type+'-'+direction+'-label'}>{this.state[type][direction]}</span>
                    </div>

                )
            })
        })

        return (
            <div namespace>
                <div className="ant-form-item">
                    <label className="col-8">内外边距</label>

                    <div className="col-14">
                        <div className="tool-box">
                            {buttons}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})