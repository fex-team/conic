const React = require('react')
const editAction = require('../actions/edit-action')
const editStore = require('../stores/edit-store')
const settingAction = require('../actions/setting-action')
const settingStore = require('../stores/setting-store')
const classnames = require('classnames')

const defaultJson = require('../phone-edit/default.json')

const Left = require('./left')
const Top = require('./top')
const Footer = require('./footer')
const Center = require('./center')
const PhoneEdit = require('../../edit/phone-edit')

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
            loading: true,

            tree: null,

            editKey: 0,
            previewKey: 0
        }
    },

    componentDidMount: function () {
        editStore.addChangeShowModeListener(this.changeMode)
        settingStore.addChangeTreeListener(this.changeTree)

        // :TODO 异步请求配置信息
        settingAction.setDefault({
            viewType: 'pc'
        }, defaultJson)
        setTimeout(()=> {
            this.setState({
                loading: false,
                tree: defaultJson
            })
        }, 1000)
    },

    componentWillUnmount: function () {
        editStore.removeChangeShowModeListener(this.changeMode)
        settingStore.removeChangeTreeListener(this.changeTree)
    },

    changeMode: function () {
        let mode = editStore.getShowMode()
        let newState = {
            mode: mode
        }
        if (mode === 'preview') {
            newState.previewKey = this.state.previewKey + 1
        }
        this.setState(newState)
    },

    changeTree: function () {
        this.setState({
            tree: settingStore.getTree(),
            editKey: this.state.editKey + 1
        })
    },

    render: function () {
        let sdClass = classnames({
            'g-sd': true,
            'g-sd-enter': this.state.mode === 'edit',
            'g-sd-leave': this.state.mode === 'preview'
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

                    <div className={mnClass}>
                        <Center/>

                        <div className="phone-out">
                            <div className="phone">
                                <PhoneEdit editKey={'edit-'+this.state.editKey}
                                           previewKey={'preview-'+this.state.previewKey}
                                           tree={this.state.tree}/>
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