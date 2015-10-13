var React = require('react')
var Left = require('./left')
var Top = require('./top')
var Right = require('./right')
var style = require('./style')

module.exports = React.createClass({
    render: function () {
        return (
            <div>
                <Top/>

                <div style={style.layout}>
                    <Left/>

                    <div style={style.child}>{this.props.children}</div>
                    <Right/>
                </div>
            </div>
        )
    }
})