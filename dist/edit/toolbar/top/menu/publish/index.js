const React = require('react');

module.exports = React.createClass({
    displayName: "exports",

    getInitialState: function () {
        return {};
    },

    render: function () {
        return React.createElement(
            "div",
            { className: "operate-btn" },
            "发布"
        );
    }
});