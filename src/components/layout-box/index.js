var React = require('react')
var $ = require('jquery')
var Components = require('../../components')
var Edit = require('../../phone-edit/edit')
var _ = require('lodash')

let LayoutBox = React.createClass({
    getDefaultProps: function () {
        return {
            name: 'LayoutBox',
            desc: '万能矩形',
            opts: {
                flex: {
                    edit: 'flex',
                    value: {
                        display: 'flex',
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
                        height: 50,
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
            childs: this.props.childs
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
                childs: item.childs || [],
                selected: item.selected || false
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

module.exports = LayoutBox