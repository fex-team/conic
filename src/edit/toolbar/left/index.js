const React = require('react')
const Tabs = require('antd/lib/tabs')
const TabPane = Tabs.TabPane
const Tooltip = require('antd/lib/tooltip')

const Edit = require('./edit')
const Component = require('./component')

const Right = React.createClass({
    getInitialState: function () {
        return {}
    },
    render: function () {
        return (
            <div style={{height:'100%'}}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab={<Tooltip title="编辑组件"><i className="fa fa-edit"></i></Tooltip>}
                             key="1">
                        <Edit/>
                    </TabPane>
                    <TabPane tab={<Tooltip title="组件库"><i className="fa fa-cubes"></i></Tooltip>}
                             key="2">
                        <Component/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
})


module.exports = Right