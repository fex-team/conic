const React = require('react')
const Switch = require('antd/lib/switch')
const auxiliaryAction = require('../../../actions/auxiliary-action')

const Auxiliary = React.createClass({
    getInitialState: function () {
        return {}
    },

    onChange: function (isOk) {
        auxiliaryAction.showLayoutBox(isOk)
    },

    render: function () {
        return (
            <div>
                <form className="ant-form-horizontal">
                    <div className="ant-form-item">
                        <label htmlFor="control-input"
                               className="col-10">显示布局框：</label>

                        <div className="col-14">
                            <Switch defaultChecked={false}
                                    onChange={this.onChange}/>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
})


module.exports = Auxiliary