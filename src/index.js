const React = require('react')
const ReactDOM = require('react-dom')
const routes = require('./common.js')

if (process.env.NODE_ENV === 'development') {
    let Perf = require('react-addons-perf')
    Perf.start()

    ReactDOM.render(routes, document.getElementById('react-dom'))

    Perf.stop()
    Perf.printWasted()
}
else {
    ReactDOM.render(routes, document.getElementById('react-dom'))
}
