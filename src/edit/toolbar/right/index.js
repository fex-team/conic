const React = require('react')
const Tabs = require('antd/lib/tabs')
const TabPane = Tabs.TabPane
const Tooltip = require('antd/lib/tooltip')
const editStore = require('../../stores/edit-store')
const Badge = require('antd/lib/badge')
const classNames = require('classnames')

const Tree = require('./tree')

require('./index.scss')

const Right = React.createClass({
    getInitialState: function () {
        return {
            activeTab: 'tree',
            show: true
        }
    },

    componentDidMount: function () {
    },

    componentWillUnmount: function () {
    },

    render: function () {

        let closeClass = classNames({
            'close-container': true,
            'show-animate': this.state.show,
            'hide-animate': !this.state.show
        })

        return (
            <div className="_namespace" style={{height:'100%'}}>
                <Tabs activeKey={this.state.activeTab}>
                    <TabPane tab={<Tooltip placement="bottom" title="项目树状结构"><i className="fa fa-tree"></i></Tooltip>}
                             key="tree">
                        <Tree />
                    </TabPane>
                </Tabs>

                <div className={closeClass}
                     onClick={this.handleClose}>
                    收起
                </div>
            </div>
        )
    }
})


module.exports = Right