var React = require('react')
var Left = require('./left')
var Top = require('./top')
var Right = require('./right')
//var ReactShadow = require('react-shadow')

module.exports = React.createClass({
    //mixins: [ReactShadow],
    //cssSource: require('./index.scss').toString(),
    render: function () {
        return (
            <div>
                <Top/>

                <div className="layout">
                    <Left/>

                    <div className="phone">
                        <div className="status-bar"></div>
                        {this.props.children}
                    </div>
                    <Right/>
                </div>
            </div>
        )
    }
})