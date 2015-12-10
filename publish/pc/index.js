const React = require('react')
const json = require('../../src/edit/toolbar/center/layout-template/data/company-home.json')

const Container = React.createClass({
    render: function () {
        return (
            <div>
                <Container mode="preview" {...json}/>
            </div>
        )
    }
})

module.exports = Container