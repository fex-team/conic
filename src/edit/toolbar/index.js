const React = require('react')
const Left = require('./left')
const Top = require('./top')
const Right = require('./right')
const Footer = require('./footer')
const editAction = require('../actions/edit-action')
const editStore = require('../stores/edit-store')
const settingAction = require('../actions/setting-action')
const classnames = require('classnames')

const defaultJson = require('../phone-edit/default.json')

const Phone = require('../../edit/phone-edit')

require('./index.scss')
require('./animate.scss')
require('./loading.scss')

let Container = React.createClass({
    getInitialState: function () {
        return {
            // 操作页面中当前选中对象
            selection: {},

            // 页面模式
            mode: 'edit',

            // 是否加载完毕
            loading: true
        }
    },

    componentDidMount: function () {
        editStore.addChangeShowModeListener(this.changeMode)

        // :TODO 异步请求配置信息
        settingAction.setDefault({
            viewType: 'pc'
        }, defaultJson)
        setTimeout(()=> {
            this.setState({
                loading: false
            })
        }, 1000)
    },

    componentWillUnmount: function () {
        editStore.removeChangeShowModeListener(this.changeMode)
    },

    changeMode: function () {
        this.setState({
            mode: editStore.getShowMode()
        })
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

        let children
        if (this.state.loading) {
            children = (
                <div className="loading">
                    <i className="fa fa-refresh fa-spin"></i>
                </div>
            )
        } else {
            children = (
                <div>
                    <div className="g-hd">
                        <Top/>
                    </div>

                    <div className={sdClass}>
                        <Left/>
                    </div>

                    <div className={rdClass}>
                        <Right />
                    </div>

                    <div className={mnClass}
                         onClick={this.onClickPhoneOut}>
                        <div className="phone-out">
                            <div className="phone">
                                <Phone/>
                            </div>
                        </div>
                    </div>
                    <div className={ftClass}>
                        <Footer/>
                    </div>
                </div>
            )
        }

        return (
            <div namespace
                 style={{height:'100%'}}>
                {children}
            </div>
        )
    }
})

module.exports = Container