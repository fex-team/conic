const React = require('react');
const editStore = require('../../stores/edit-store');
const historyStore = require('../../stores/history-store');
const $ = require('jquery');
const ReactDOM = require('react-dom');
const _ = require('lodash');
require('./index.scss');

const defaultStyle = {
    position: 'absolute',
    height: '100%',
    width: '100%',
    outline: '2px solid #2DB7F5',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    zIndex: 100
};

var Selector = React.createClass({
    displayName: 'Selector',

    getInitialState: function () {
        return {};
    },

    render: function () {
        let style = _.cloneDeep(defaultStyle);
        if (this.props.absolute) {
            style.outline = '2px solid #A900FF';
        }

        return React.createElement(
            'div',
            { className: '_namespace',
                style: style },
            React.createElement('div', { className: 'relative' })
        );
    }
});

module.exports = Selector;