var React = require('react');
require('./index.scss');

var root = require('../../phone-edit/index');
var analyse = require('../../util/analyse');
var generate = require('../../util/generate');

generate(analyse(root));

module.exports = React.createClass({
    render: function () {
        return (
            <div>
                <div className="layout"></div>
            </div>
        )
    }
});