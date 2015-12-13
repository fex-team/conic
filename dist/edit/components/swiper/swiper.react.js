/**
 * @author dongtiancheng
 * @date 15/10/13.
 * @email dongtiancheng@baidu.com
 */

var React = require('react');
var Swiper = require('swiper');

require('swiper/dist/css/swiper.css');

var ReactSwiper = React.createClass({
    displayName: 'ReactSwiper',

    /**
     * @return {object}
     */
    render: function () {

        return React.createElement(
            'div',
            { className: 'swiper-container' },
            React.createElement(
                'div',
                { className: 'swiper-wrapper' },
                this.props.children
            )
        );
    },

    componentDidMount: function () {
        new Swiper('.swiper-container', {
            pagination: '.swiper-pagination'
        });
    }
});

var ReactSlider = React.createClass({
    displayName: 'ReactSlider',

    render: function () {
        return React.createElement(
            'div',
            { className: 'swiper-slide' },
            this.props.children
        );
    }
});

var ReactPagination = React.createClass({
    displayName: 'ReactPagination',

    render: function () {
        return React.createElement('div', { className: 'swiper-pagination' });
    }
});

module.exports.Swiper = ReactSwiper;
module.exports.Slider = ReactSlider;
module.exports.Pagination = ReactPagination;