var React = require('react')
var Left = require('./left')
var Top = require('./top')
var Right = require('./right')
var Footer = require('./footer')
require('./index.scss')

module.exports = React.createClass({
    getInitialState: function () {
        return {
            // 操作页面中当前选中对象
            selection: {}
        }
    },

    render: function () {
        return (
            <div>
                <div className="g-hd">
                    <Top/>
                </div>

                <div className="g-sd">
                    <Left/>
                </div>

                <div className="g-rd">
                    <Right/>
                </div>

                <div className="g-mn">
                    <div className="phone-out">
                        <div className="phone">
                            <div className="status-bar"></div>
                            <div className="children">{this.props.children}</div>
                        </div>
                    </div>
                </div>
                <div className="g-ft">
                    <Footer/>
                </div>
            </div>
        )
    }
})