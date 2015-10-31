var React = require('react')
var Components = require('../components')
var Edit = require('../phone-edit/edit')
var LayoutBox = require('../components/layout-box')
var _ = require('lodash')

module.exports = {
    // 获得子元素的edit引用
    getChildsEdit: function () {
        return this.childEdits
    },

    render: function () {
        // 存储子元素的edit引用清空
        this.childEdits = []

        let children = this.props.childs.map((item, index)=> {
            let component = Components[item.name]
            let Editprops = {
                key: item.uniqueKey,
                parent: this.props.edit || null,
                index: index,
                opts: item.opts || {},
                dragSource: true,
                childs: item.childs || [],
                selected: item.selected || false,
                ref: (ref)=> {
                    if (ref === null)return
                    this.childEdits.push(ref)
                }
            }

            if (item.name === this.props.name) {
                component = this.getSelfComponent()
                Editprops.dragTarget = true
            } else if (item.name === 'LayoutBox' && this.props.name === 'LayoutBoxAbsolute') {
                component = this.getLayoutBox()
                Editprops.dragTarget = true
            }
            return React.createElement(Edit, Editprops, React.createElement(component))
        })

        console.log('layout render')
        return (
            <div>
                <div style={_.assign(this.props.opts.flex.value, this.props.opts.base.value)}>
                    {children}
                </div>
            </div>
        )
    }
}