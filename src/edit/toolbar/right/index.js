const React = require('react')
const Tabs = require('antd/lib/tabs')
const TabPane = Tabs.TabPane
const Tooltip = require('antd/lib/tooltip')
const editStore = require('../../stores/edit-store')
const Badge = require('antd/lib/badge')

const Tree = require('./tree')

const Right = React.createClass({
    getInitialState: function () {
        return {
            activeTab: 'tree'
        }
    },

    componentDidMount: function () {
        //editStore.addLeftTabChangeListener(this.onLeftTabChange)
    },

    componentWillUnmount: function () {
        //editStore.removeLeftTabChangeListener(this.onLeftTabChange)
    },

    onLeftTabChange: function () {
        this.setState({
            activeTab: editStore.getTabName()
        })
    },

    render: function () {
        return (
            <div namespace style={{height:'100%'}}>
                <Tabs activeKey={this.state.activeTab}>
                    <TabPane tab={<Tooltip placement="bottom" title="项目树状结构"><i className="fa fa-tree"></i></Tooltip>}
                             key="tree">
                        <Tree />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
})


module.exports = Right