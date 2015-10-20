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
                <Edit dragTarget="true">
                    <div className="phone-edit-container">
                        <Edit dragTarget="true"
                              dragSource="true">
                            <LayoutBoxComponent/>
                        </Edit>
                        <Edit dragSource="true">
                            <LayoutBoxComponent/>
                        </Edit>
                        <Edit dragTarget="true">
                            <LayoutBoxComponent/>
                        </Edit>
                        <Edit>
                            <LayoutBoxComponent/>
                        </Edit>
                        <Edit dragTarget="true"
                              dragSource="true">
                            <TestComponent/>
                        </Edit>
                    </div>
                </Edit>
            </div>
        )
    }
});

module.exports = Root;