var React = require('react');
var editStore = require('../../stores/edit-store');
var classNames = require('classnames');
var iconMap = require('../left/component/components/icon-map');
var footerStore = require('../../stores/footer-store');
var Tooltip = require('antd/lib/tooltip');
require('./index.scss');

let editLists = [];

function getParent(edit) {
    if (!edit) {
        return;
    }

    editLists.unshift(edit);

    if (!edit.props.parent) {
        return;
    }
    getParent(edit.props.parent);
}

module.exports = React.createClass({
    displayName: 'exports',

    getInitialState: function () {
        return {
            editLists: [],
            opts: footerStore.get()
        };
    },

    onComponentChange: function () {
        // 获得所有父级直到根目录
        editLists = [];
        getParent(editStore.get());
        this.setState({
            editLists: editLists
        });
    },

    onFooterOptsChange: function (opts) {
        this.setState({
            opts: footerStore.get()
        });
    },

    componentDidMount: function () {
        editStore.addChangeListener(this.onComponentChange);
        footerStore.addChangeListener(this.onFooterOptsChange);
    },

    componentWillUnmount: function () {
        editStore.removeChangeListener(this.onComponentChange);
        footerStore.removeChangeListener(this.onFooterOptsChange);
    },

    selectComponent: function (edit) {
        edit.clickAction();
    },

    render: function () {
        let arrows = this.state.editLists.map((item, index) => {
            let className = classNames({
                arrow: true,
                active: index === this.state.editLists.length - 1
            });

            return React.createElement(
                'div',
                { className: className,
                    key: index,
                    onClick: this.selectComponent.bind(this, item) },
                React.createElement('i', { style: { marginRight: 5 },
                    className: 'fa fa-' + iconMap[item.props.children.props.name] }),
                item.props.children.props.desc
            );
        });

        let instanceNumberClass = classNames({
            'instance-number': true,
            green: this.state.opts.instanceNumber < 100,
            warning: this.state.opts.instanceNumber >= 100 && this.state.opts.instanceNumber < 500,
            error: this.state.opts.instanceNumber > 500
        });

        return React.createElement(
            'div',
            { className: '_namespace' },
            React.createElement(
                'div',
                { className: 'layout' },
                React.createElement(
                    'div',
                    { className: 'footer-tree' },
                    arrows
                ),
                React.createElement(
                    'div',
                    { className: 'right' },
                    React.createElement(
                        'div',
                        { className: 'info' },
                        React.createElement(
                            Tooltip,
                            { title: '当前页面组件实例总数，每个页面保持在500以内，可以保证流畅编辑状态' },
                            React.createElement(
                                'span',
                                { className: instanceNumberClass },
                                React.createElement('i', { style: { marginRight: 5 },
                                    className: 'fa fa-cube' }),
                                this.state.opts.instanceNumber
                            )
                        )
                    )
                )
            )
        );
    }
});