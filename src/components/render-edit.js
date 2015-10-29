var React = require('react')
var Components = require('../components')
var Edit = require('../phone-edit/edit')
var LayoutBox = require('../components/layout-box')

module.exports = {
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

    // 获得子元素的edit引用
    getChildsEdit: function () {
        return this.childEdits
    },

    render: function () {
        // 存储子元素的edit引用清空
        this.childEdits = []

        let children = this.state.childs.map((item, index)=> {
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
}