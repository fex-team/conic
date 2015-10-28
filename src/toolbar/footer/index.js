var React = require('react')
var editStore = require('../../stores/edit-store')
var classnames = require('classnames')
require('./index.scss')

let editLists = []

function getParent(edit) {
    if (!edit) {
        return
    }

    editLists.unshift(edit)

    if (!edit.props.parent) {
        return
    }
    getParent(edit.props.parent)
}

module.exports = React.createClass({
    getInitialState: function () {
        return {
            editLists: []
        }
    },

    onComponentChange: function () {
        // 获得所有父级直到根目录
        editLists = []
        getParent(editStore.get())
        this.setState({
            editLists: editLists
        })
    },

    componentDidMount: function () {
        editStore.addChangeListener(this.onComponentChange)
    },

    componentWillUnmount: function () {
        editStore.removeChangeListener(this.onComponentChange)
    },

    selectComponent: function (edit) {
        edit.onClickAction()
    },

    render: function () {
        let arrows = this.state.editLists.map((item, index)=> {
            let className = classnames({
                arrow: true,
                active: index === this.state.editLists.length - 1
            })

            return (
                <div className={className}
                     key={index}
                     onClick={this.selectComponent.bind(this,item)}>{item.state.childProps.desc}</div>
            )
        })

        return (
            <div>
                <div className="layout">
                    {arrows}
                </div>
            </div>
        )
    }
})