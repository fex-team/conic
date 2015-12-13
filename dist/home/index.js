const React = require('react');
const ReactRouter = require('react-router');
const Link = ReactRouter.Link;
require('./index.scss');

var Home = React.createClass({
    displayName: 'Home',

    render: function () {
        return React.createElement(
            'div',
            { className: '_namespace' },
            React.createElement(
                Link,
                { className: 'btn', to: '/edit' },
                '编辑网站'
            )
        );
    }
});

module.exports = Home;