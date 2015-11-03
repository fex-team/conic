const React = require('react')
const Tabs = require('antd/lib/tabs')
const TabPane = Tabs.TabPane
const Tooltip = require('antd/lib/tooltip')

const Tree = require('./tree')
const Auxiliary = require('./auxiliary')
const History = require('./history')

const Right = React.createClass({
    getInitialState: function () {
        return {}
    },
    render: function () {
        return (
            <div style={{height:'100%'}}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab={<Tooltip title="项目树状结构"><i className="fa fa-tree"></i></Tooltip>}
                             key="1">
                        <Tree />
                    </TabPane>
                    <TabPane tab={<Tooltip title="设置"><i className="fa fa-gear"></i></Tooltip>}
                             key="2">
                        <Auxiliary/>
                    </TabPane>
                    <TabPane tab={<Tooltip title="历史纪录"><i className="fa fa-history"></i></Tooltip>}
                             key="3">
                        <History/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
})


module.exports = Right