const React = require('react')
const classnames = require('classnames')
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
        let layoutClass = classnames({
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

        let closeClass = classnames({
            'close-container': true,
            'show-animate': this.state.show,
            'hide-animate': !this.state.show
        })

        return (
            <div __namespace
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