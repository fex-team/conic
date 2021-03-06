var React = require('react')
var Layout = require('./layout')
var Base = require('./base')
var dragDropManager = require('../../../../drag-drop-manager')
require('./index.scss')

const ToolBarTopComponents = React.createClass({
    getInitialState: function () {
        return {}
    },

    render: function () {
        let component
        switch (this.props.type) {
        case 'layout':
            component = (
                <Layout/>
            )
            break
        case 'base':
            component = (
                <Base/>
            )
            break
        }

        return (
            <div className="_namespace">
                {component}
            </div>
        )
    }
})

module.exports = dragDropManager.getDefaultManager()(ToolBarTopComponents)