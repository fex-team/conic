/**
 * @author dongtiancheng
 * @date 15/10/13.
 * @email dongtiancheng@baidu.com
 */

var React = require('react');
var Swiper = require('swiper');

require('swiper/dist/css/swiper.css');

var ReactSwiper = React.createClass({

    /**
     * @return {object}
     */
    render: function () {

        return (
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    {this.props.children}
                </div>
            </div>
        );
    },

    componentDidMount: function () {
        new Swiper('.swiper-container', {
            pagination: '.swiper-pagination'
        });
    }
});

var ReactSlider = React.createClass({
    render: function () {
        return (
            <div className="swiper-slide">{this.props.children}</div>
        );
    }
});

var ReactPagination = React.createClass({
    render: function () {
        return (
            <div className="swiper-pagination"></div>
        );
    }
});

module.exports.Swiper = ReactSwiper;
module.exports.Slider = ReactSlider;
module.exports.Pagination = ReactPagination;