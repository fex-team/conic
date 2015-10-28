const React = require('react')
const Collapse = require('antd/lib/collapse')
const Panel = Collapse.Panel
const Tree = require('./tree')
const Auxiliary = require('./auxiliary')

const Right = React.createClass({
    getInitialState: function () {
        return {}
    },
    render: function () {
        return (
            <div>
                <Collapse defaultActiveKey={["1"]}>
                    <Panel header={`树状视图`}
                           key="1">
                        <Tree/>
                    </Panel>
                    <Panel header={`辅助工具`}
                           key="2">
                        <Auxiliary/>
                    </Panel>
                </Collapse>
            </div>
        )
    }
})


module.exports = Right