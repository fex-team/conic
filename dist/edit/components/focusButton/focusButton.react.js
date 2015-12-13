var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * @author dongtiancheng
 * @date 15/10/13.
 * @email dongtiancheng@baidu.com
 */
var $ = require('jquery');
var React = require('react');
var Button = require('../button/button.react');

/**
 *  吧关注按钮
 *
 *  @props fid {string} fid
 *  @props uid {string} uid
 *  @props buttonText {string} 按钮内容
 *  @props itb_tbs {string}
 *  @props isLogin {bool} 是否登陆
 *  @props isFocused {bool} 是否已关注
 *  @props beforeFocus {function} 执行点击关注之前的动作
 *  @props afterFocus {function} 执行点击关注之后的动作
 */
var FocusButton = React.createClass({
    displayName: 'FocusButton',

    getInitialState: function () {
        return { isFocused: this.props.isFocused };
    },
    checkNeeds: function () {
        var needs = arguments;
        var needed = [];
        var noneNeed = [];
        var self = this;

        $.each(needs, function (val, name) {
            if (self.props[name]) {
                needed.push(name);
            } else {
                noneNeed.push(name);
            }
        });

        return noneNeed;
    },
    shouldComponentUpdate: function () {
        var isFocused = parseInt(this.props.isFocused) || 0;
        var isLogin = this.props.isLogin;

        if (typeof isLogin === 'string' && (isLogin !== 'false' || isLogin !== 'true')) {
            return false;
        }

        var self = this;

        if (isFocused) {
            return false;
        }

        if (!isLogin) {
            var needs = this.checkNeeds('loginUrl');
            if (needs.length === 0) {
                location.href = this.props.loginUrl;
            } else {
                location.href = 'http://tieba.baidu.com';
            }
        }

        var uname = ['kw', 'fid', 'uid', 'itb_tbs'];
        var data = {};

        $.each(uname, function (index, name) {
            data[name] = self.props[name];
        });

        $.ajax({
            url: '/favolike',
            data: data,
            method: 'GET',
            success: function (data) {
                if (data.no === 0) {
                    self.setState({
                        isFocused: true
                    });
                } else {
                    throw new Error('Error: Components FocusButton \n msg: Server response error, please check your params');
                }
            },
            error: function () {}
        });
    },
    onButtonClick: function (e) {
        e.preventDefault();
        var beforeClick = this.props.beforeClick;
        var afterClick = this.props.afterClick;

        if (beforeClick) {
            var flag = beforeClick.call(this, this.state, this.props);
            if (flag) {
                this.setState({ isFocused: true });
            }
        } else {
            this.setState({ isFocused: true });
        }

        if (afterClick) {
            afterClick.call(this, this.state, this.props);
        }
    },
    render: function () {
        var isFocused = parseInt(this.state.isFocused);

        if (isFocused) {
            return React.createElement(
                'p',
                { className: 'focused' },
                '已关注'
            );
        } else {
            return React.createElement(
                Button,
                _extends({}, this.props, {
                    className: 'btn-default focus-button image-radius focus',
                    onClick: this.onButtonClick,
                    isLogin: this.props.isLogin,
                    isFocused: this.props.isFocused,
                    fid: this.props.fid,
                    kw: this.props.kw,
                    uid: this.props.uid,
                    itb_tbs: this.props.itb_tbs
                }),
                this.props.children
            );
        }
    }
});

module.exports = FocusButton;