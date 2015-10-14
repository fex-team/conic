var React = require('react')
var ReactShadow = require('react-shadow')

module.exports = React.createClass({
    mixins: [ReactShadow],
    cssSource: require('./index.scss').toString(),
    render: function() {
        return (
            <div className="layout">顶部栏</div>
        )
    }
})