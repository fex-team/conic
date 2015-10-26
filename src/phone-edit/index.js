var React = require('react')
var DragTarget = require('./drag-target')
var DragSource = require('../toolbar/top/component/drag-source')
var Edit = require('./edit')
require('./index.scss')

var LayoutBoxComponent = require('../components/layout-box')
var TestComponent = require('../components/test-component')

var pageSource = require('../default/page.json');
var generator = require('./generate');

var Root = React.createClass({
    getInitialState: function () {
        return {}
    },

    render: function () {
        return (
            <div>
                {generator(pageSource)}
            </div>
        )
    }
});

module.exports = Root;