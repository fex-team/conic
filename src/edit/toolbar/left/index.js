const React = require('react')
const Tabs = require('antd/lib/tabs')
const TabPane = Tabs.TabPane
const Tooltip = require('antd/lib/tooltip')
const editStore = require('../../stores/edit-store')
const Badge = require('antd/lib/badge')

const Edit = require('./edit')
const Component = require('./component')
const Tree = require('./tree')
const Auxiliary = require('./auxiliary')
const History = require('./history')

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
            <div namespace style={{height:'100%'}}>
                <Tabs activeKey={this.state.activeTab}>
                    <TabPane tab={<Tooltip placement="bottom" title="编辑组件"><i className="fa fa-edit"></i></Tooltip>}
                             key="edit">
                        <Edit/>
                    </TabPane>
                    <TabPane tab={<Tooltip placement="bottom" title="组件库"><i className="fa fa-cubes"></i></Tooltip>}
                             key="component">
                        <Component/>
                    </TabPane>
                    <TabPane tab={<Tooltip placement="bottom" title="项目树状结构"><i className="fa fa-tree"></i></Tooltip>}
                             key="1">
                        <Tree />
                    </TabPane>
                    <TabPane tab={
                        <Tooltip placement="bottom" title="历史纪录">
                            <Badge count={this.state.historyCount}>
                                <i className="fa fa-history"></i>
                            </Badge>
                        </Tooltip>
                    }
                             key="2">
                        <History/>
                    </TabPane>
                    <TabPane tab={<Tooltip placement="bottom" title="设置"><i className="fa fa-gear"></i></Tooltip>}
                             key="3">
                        <Auxiliary/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
})


module.exports = Right