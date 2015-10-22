/**
 * @author dongtiancheng
 * @date 15/10/15.
 * @email dongtiancheng@baidu.com
 */

// TODO 使用编译工具生成模块列表
module.exports = {
    'Button': require('./button/button.react'),
    'FocusButton': require('./focusButton/focusButton.react'),
    'ReactSwiper': require('./swiper/swiper.react').Swiper,
    'ReactSlider': require('./swiper/swiper.react').Slider,
    'ReactPagination': require('./swiper/swiper.react').Pagination,
    'Edit': require('../phone-edit/edit'),
    'LayoutBox': require('./layout-box'),
    'Test': require('./test-component')
};