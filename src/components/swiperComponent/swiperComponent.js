/**
 * @author dongtiancheng
 * @date 15/10/16.
 * @email dongtiancheng@baidu.com
 */

var React = require('react');

var Swiper = require('../swiper/swiper.react').Swiper;
var Slider = require('../swiper/swiper.react').Slider;
var Pagination = require('../swiper/swiper.react').Pagination;

var SwiperComponent = React.createClass({
    render: function () {
        return (
            <div className="helloworld">
                <Swiper title="123">
                    <Slider>
                        123123
                        <div>1232222</div>
                        <div>1232222</div>
                    </Slider>
                    <Slider>123</Slider>
                    <Slider>123</Slider>
                </Swiper>
                <div className="helloworld"></div>
                <Pagination />
            </div>
        );
    }
});

module.exports = SwiperComponent;