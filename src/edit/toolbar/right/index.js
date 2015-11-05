const React = require('react')
const Tabs = require('antd/lib/tabs')
const TabPane = Tabs.TabPane
const Tooltip = require('antd/lib/tooltip')
const Badge = require('antd/lib/badge')
const historyStore = require('../../stores/history-store')

const Tree = require('./tree')
const Auxiliary = require('./auxiliary')
const History = require('./history')

const Right = React.createClass({
    getInitialState: function () {
        return {
            historyCount: 0
        }
    },

    componentDidMount: function () {
        historyStore.addChangeListener(this.historyChangeCount)
    },

    componentWillUnmount: function () {
        historyStore.removeChangeListener(this.historyChangeCount)
    },

    historyChangeCount: function () {
        this.setState({
            historyCount: historyStore.get().length
        })
    },

    render: function () {
        return (
            <div style={{height:'100%'}}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab={<Tooltip title="项目树状结构"><i className="fa fa-tree"></i></Tooltip>}
                             key="1">
                        <Tree />
                    </TabPane>
                    <TabPane tab={
                        <Tooltip title="历史纪录">
                            <Badge count={this.state.historyCount}>
                                <i className="fa fa-history"></i>
                            </Badge>
                        </Tooltip>
                    }
                             key="2">
                        <History/>
                    </TabPane>
                    <TabPane tab={<Tooltip title="设置"><i className="fa fa-gear"></i></Tooltip>}
                             key="3">
                        <Auxiliary/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
})


module.exports = Right