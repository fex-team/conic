var React = require('react');
require('./index.scss');

module.exports = React.createClass({
    displayName: 'exports',

    getInitialState: function () {
        return {
            // 当前菜单类型
            menuType: 'layout'
        };
    },

    componentWillMount: function () {
        this.props.onChangeType(this.state.menuType);
    },

    changeMenuType: function (type) {
        if (this.state.menuType === type) {
            return;
        }
        this.setState({
            menuType: type
        });
        this.props.onChangeType(type);
    },

    render: function () {
        return React.createElement(
            'div',
            { className: '_namespace' },
            React.createElement(
                'table',
                { className: 'menu-table' },
                React.createElement(
                    'tbody',
                    null,
                    React.createElement(
                        'tr',
                        null,
                        React.createElement(
                            'td',
                            { onClick: this.changeMenuType.bind(this, 'layout'),
                                className: this.state.menuType == 'layout' ? 'active' : null },
                            '布局'
                        ),
                        React.createElement(
                            'td',
                            { onClick: this.changeMenuType.bind(this, 'base'),
                                className: this.state.menuType == 'base' ? 'active' : null },
                            '基础组件'
                        ),
                        React.createElement(
                            'td',
                            { onClick: this.changeMenuType.bind(this, 'form'),
                                className: this.state.menuType == 'form' ? 'active' : null },
                            '表单'
                        ),
                        React.createElement('td', null)
                    )
                )
            )
        );
    }
});