const React = require('react')
const Tabs = require('antd/lib/tabs')
const TabPane = Tabs.TabPane
const Tooltip = require('antd/lib/tooltip')
const editStore = require('../../stores/edit-store')

const Edit = require('./edit')
const Component = require('./component')

const Right = React.createClass({
    getInitialState: function () {
        return {
            activeTab: 'edit'
        }
    },

    componentDidMount: function () {
        editStore.addLeftTabChangeListener(this.onLeftTabChange)
    },

    componentWillUnmount: function () {
        editStore.removeLeftTabChangeListener(this.onLeftTabChange)
    },

    onLeftTabChange: function () {
        this.setState({
            activeTab: editStore.getTabName()
        })
    },

    render: function () {
        return (
            <div style={{height:'100%'}}>
                <Tabs activeKey={this.state.activeTab}>
                    <TabPane tab={<Tooltip title="编辑组件"><i className="fa fa-edit"></i></Tooltip>}
                             key="edit">
                        <Edit/>
                    </TabPane>
                    <TabPane tab={<Tooltip title="组件库"><i className="fa fa-cubes"></i></Tooltip>}
                             key="component">
                        <Component/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
})


module.exports = Right