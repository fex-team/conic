const React = require('react')
const historyStore = require('../../../../stores/history-store')
const historyAction = require('../../../../actions/history-action')
const classnames = require('classnames')
require('./index.scss')

module.exports = React.createClass({
    getInitialState: function () {
        return {
            historyCount: 0
        }
    },

    componentDidMount: function () {
        historyStore.addChangeListener(this.onHistoryChange)
        historyStore.addReverseListener(this.onHistoryChange)
    },

    componentWillUnmount: function () {
        historyStore.removeChangeListener(this.onHistoryChange)
        historyStore.removeReverseListener(this.onHistoryChange)
    },

    reverse: function () {
        if (this.state.historyCount === 0 || historyStore.getCurrentIndex() === this.state.historyCount - 1)return

        historyAction.revertHistory(historyStore.getCurrentIndex(), historyStore.getCurrentIndex() + 1)
    },

    forward: function () {
        if (historyStore.getCurrentIndex() === 0)return

        historyAction.revertHistory(historyStore.getCurrentIndex(), historyStore.getCurrentIndex() - 1)
    },

    onHistoryChange: function () {
        this.setState({
            historyCount: historyStore.get().length
        })
    },

    render: function () {
        var reverseClass = classnames({
            'operate-btn': true,
            'disabled': this.state.historyCount === 0 || historyStore.getCurrentIndex() === this.state.historyCount - 1
        })

        var forwardClass = classnames({
            'operate-btn': true,
            'disabled': historyStore.getCurrentIndex() === 0
        })

        return (
            <div>
                <div className="row">
                    <div onClick={this.reverse}
                         style={{boxShadow:'none'}}
                         className={reverseClass}>
                        <i className="fa fa-reply"></i>
                    </div>
                    <div onClick={this.forward}
                         style={{borderLeft:'none',boxShadow:'none'}}
                         className={forwardClass}>
                        <i className="fa fa-share"></i>
                    </div>
                </div>
            </div>
        )
    }
})