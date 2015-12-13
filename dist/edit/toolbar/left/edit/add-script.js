const React = require('react');

module.exports = React.createClass({
    displayName: "exports",

    getInitialState: function () {
        return {};
    },

    render: function () {
        return React.createElement(
            "div",
            { className: "add-script-layout" },
            React.createElement(
                "div",
                { className: "ant-btn add-script-btn" },
                React.createElement("i", { className: "fa fa-plus-circle",
                    style: { marginRight: 5 } }),
                "添新加脚本"
            )
        );
    }
});