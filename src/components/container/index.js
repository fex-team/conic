var React = require('react')
var $ = require('jquery')
var _ = require('lodash')
var Edit = require('../../phone-edit/edit')
var LayoutBox = require('../../components/layout-box')
var Components = require('../../components')

let Container = React.createClass({
    getDefaultProps: function () {
        return {
            name: 'Container',
            desc: '手机壳',
            opts: {
                flex: {
                    edit: 'flex',
                    value: {
                        flexDirection: 'row',
                        flexWrap: 'nowrap',
                        justifyContent: 'flex-start',
                        alignItems: 'stretch'
                    }
                },
                base: {
                    value: {
                        margin: 0,
                        padding: 0,
                        width: 500,
                        height: 800,
                        fontSize: 14,
                        color: '#333',
                        background: 'white'
                    },
                    edit: 'style'
                }
            }
        }
    },

    getInitialState: function () {
        return {
            childs: this.props.childs || []
        }
    },

    componentWillMount: function () {
        // 为每个子组件生成uniqueKey
        this.state.childs.map((item, index)=> {
            item.uniqueKey = index
        })
    },

    render: function () {
        let children = this.state.childs.map((item, index)=> {
            let component = Components[item.name]
            let Editprops = {
                key: item.uniqueKey,
                parent: this.props.edit || null,
                index: index,
                customOpts: item.opts || {},
                dragSource: true,
                childs: item.childs || []
            }
            if (item.name === 'LayoutBox') {
                component = LayoutBox
                Editprops.dragTarget = true
            }
            return React.createElement(Edit, Editprops, React.createElement(component))
        })

        return (
            <div>
                <div style={Object.assign(this.props.opts.flex.value,this.props.opts.base.value)}>
                    {children}
                </div>
            </div>
        )
    }
})

module.exports = Container