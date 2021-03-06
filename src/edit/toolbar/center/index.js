const React = require('react')
const classNames = require('classnames')
const viewStore = require('../../stores/view-store')
const viewAction = require('../../actions/view-action')
require('./index.scss')

const LayoutTemplate = require('./layout-template')

module.exports = React.createClass({
    getInitialState: function () {
        return {
            show: false
        }
    },

    componentDidMount: function () {
        viewStore.addchangeViewListener(this.openView)
        viewStore.addCloseViewListener(this.closeView)
    },

    componentWillUnmount: function () {
        viewStore.removechangeViewListener(this.openView)
        viewStore.removeCloseViewListener(this.closeView)
    },

    openView: function () {
        this.setState({
            show: true
        })
    },

    closeView: function () {
        this.setState({
            show: false
        })
    },

    handleClose: function () {
        viewAction.closeView()
    },

    render: function () {
        let layoutClass = classNames({
            'layout': true,
            'show-animate': this.state.show,
            'hide-animate': !this.state.show
        })

        let viewChild
        switch (viewStore.getViewName()) {
        case 'layoutTemplate':
            viewChild = (
                <LayoutTemplate/>
            )
            break
        }

        let closeClass = classNames({
            'close-container': true,
            'show-animate': this.state.show,
            'hide-animate': !this.state.show
        })

        return (
            <div className="_namespace"
                 style={{height:'100%',position:'relative'}}>
                <div className={layoutClass}>
                    {viewChild}
                </div>
                <div className={closeClass}
                     onClick={this.handleClose}>
                    收起
                </div>
            </div>
        )
    }
})