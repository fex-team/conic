const React = require('react')
const Left = require('./left')
const Top = require('./top')
const Right = require('./right')
const Footer = require('./footer')
const editAction = require('../actions/edit-action')
const editStore = require('../stores/edit-store')
const classnames = require('classnames')

require('./index.scss')
require('./animate.scss')

let Container = React.createClass({
    getInitialState: function () {
        return {
            // 操作页面中当前选中对象
            selection: {},
            mode: 'edit'
        }
    },

    componentDidMount: function () {
        editStore.addChangeShowModeListener(this.changeMode)
    },

    componentWillUnmount: function () {
        editStore.removeChangeShowModeListener(this.changeMode)
    },

    changeMode: function () {
        this.setState({
            mode: editStore.getShowMode()
        })
    },

    // 点击空白区域
    onClickEmpty: function (event) {
        event.stopPropagation()
        editAction.selectComponent(null)
    },

    // 点击手机外部，选中手机壳
    onClickPhoneOut: function (event) {
        event.stopPropagation()
        editAction.selectContainer()
    },

    render: function () {
        let sdClass = classnames({
            'g-sd': true,
            'g-sd-enter': this.state.mode === 'edit',
            'g-sd-leave': this.state.mode === 'preview'
        })

        let rdClass = classnames({
            'g-rd': true,
            'g-rd-enter': this.state.mode === 'edit',
            'g-rd-leave': this.state.mode === 'preview'
        })

        let ftClass = classnames({
            'g-ft': true,
            'g-ft-enter': this.state.mode === 'edit',
            'g-ft-leave': this.state.mode === 'preview'
        })

        let mnClass = classnames({
            'g-mn': true,
            'g-mn-leave': this.state.mode === 'preview'
        })

        return (
            <div>
                <div className="g-hd">
                    <Top/>
                </div>

                <div className={sdClass}>
                    <Left/>
                </div>

                <div className={rdClass}>
                    <Right/>
                </div>

                <div className={mnClass}
                     onClick={this.onClickEmpty}>
                    <div className="phone-out"
                         onClick={this.onClickPhoneOut}>
                        <div className="phone">
                            <div className="status-bar"></div>
                            {this.props.children}
                        </div>
                    </div>
                </div>
                <div className={ftClass}>
                    <Footer/>
                </div>
            </div>
        )
    }
})

module.exports = Container