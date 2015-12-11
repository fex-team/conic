const React = require('react')
const ReactDOM = require('react-dom')
const Container = require('../src/edit/components/container')
const json = require('../src/edit/toolbar/center/layout-template/data/company-home.json')

require('./reset.scss')

const Main = React.createClass({
    render: function () {
        return (
            <div>
                <Container mode="preview" {...json}/>
            </div>
        )
    }
})

ReactDOM.render(<Main/>, document.getElementById('react-dom'))