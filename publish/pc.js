const React = require('react')
const ReactDOM = require('react-dom')
const Container = require('../src/edit/components/container')
const json = require('../src/edit/toolbar/center/layout-template/data/left-px-right-auto.json')

require('./reset.scss')

const Main = React.createClass({
    render: function () {
        return (
            <Container mode="preview" {...json}/>
        )
    }
})

ReactDOM.render(<Main/>, document.getElementById('react-dom'))