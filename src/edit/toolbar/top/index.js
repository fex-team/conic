const React = require('react')
require('./index.scss')

var MenuComponent = require('./menu')
const ModalComponent = require('./modal')

module.exports = React.createClass({
    render: function () {
        return (
            <div _namespace>
                <ModalComponent/>
                <MenuComponent/>
            </div>
        )
    }
})