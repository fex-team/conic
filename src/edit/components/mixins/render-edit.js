var React = require('react')
var Components = require('../../components')
var Edit = require('../../phone-edit/edit')
var LayoutBox = require('../../components/layout-box')
var _ = require('lodash')

module.exports = {
    // 获得子元素的edit引用
    getChildsEdit: function () {
        return this.childEdits
    },

    render: function () {
        let childs = this.props.childs || []
        let children

        switch (this.props.mode) {
        case 'edit':
            // 存储子元素的edit引用清空
            this.childEdits = []

            children = this.props.childs.map((item, index)=> {
                let component = Components[item.name]
                let Editprops = {
                    key: item.uniqueKey,
                    uniqueKey: item.uniqueKey,
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

            return (
                <div>
                    <div style={_.assign(this.mergedOpts.flex.value, this.mergedOpts.base.value)}>
                        {children}
                    </div>
                </div>
            )

        case 'preview':
            children = childs.map((item, index)=> {
                let component = Components[item.name]

                if (item.name === this.props.name) {
                    component = this.getSelfComponent()
                } else if (item.name === 'LayoutBox' && this.props.name === 'LayoutBoxAbsolute') {
                    component = this.getLayoutBox()
                }

                return React.createElement(component, {
                    key: index,
                    opts: item.opts,
                    childs: item.childs,
                    mode: 'preview'
                })
            })

            return (
                <div>
                    <div style={_.assign(this.mergedOpts.flex.value,this.mergedOpts.base.value)}>
                        {children}
                    </div>
                </div>
            )

        }
    }
}