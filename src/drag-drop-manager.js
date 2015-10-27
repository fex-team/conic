let ReactDnD = require('react-dnd')
let HTML5Backend = require('react-dnd-html5-backend')

let defaultManager

module.exports = {
    getDefaultManager: function () {
        if (!defaultManager) {
            defaultManager = new ReactDnD.DragDropContext(HTML5Backend)
        }
        return defaultManager
    }
}